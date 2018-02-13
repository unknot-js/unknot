import { Kefir as K } from "kefir";
import { query, queryOne } from "@standard-library/q-prime";

import { NotFoundException } from "./errors";

import attribute from "./attribute";
import className from "./className";
import events from "./events";
import style from "./style";

const MEMBER_DEFAULTS = {
  attribute,
  className,
  events,
  style
};

const LIST_DEFAULTS = {};

const domResult = e => (e === undefined ? K.constantError() : K.constant(e));

const queryMaybeBy = (sample, finder, selector) =>
  sample
    .map(() => finder(selector))
    .flatMap(domResult)
    .toProperty()
    .skipDuplicates();

const reduceFunctionSets = (element, sets) => {
  sets.forEach(functions => {
    Object.keys(functions).forEach(name => {
      element[name] = functions[name](element);
    });
  });

  return element;
};

export default function unknot(
  sample,
  { one = queryOne, all = query, member = {}, list = {} } = {}
) {
  const wrap = element =>
    reduceFunctionSets(element, [MEMBER_DEFAULTS, member]);

  const wrapList = elements =>
    reduceFunctionSets(elements, [LIST_DEFAULTS, list]);

  const domMaybe = selector => {
    const element = queryMaybeBy(sample, one, selector);

    return wrap(element);
  };

  const dom = selector => {
    const element = domMaybe(selector);

    element.onError(e => {
      throw new NotFoundException(selector);
    });

    return element;
  };

  const domList = selector => {
    const elements = queryMaybeBy(sample, all, selector);

    return wrapList(elements);
  };

  dom.maybe = domMaybe;
  dom.wrap = wrap;

  dom.list = domList;
  dom.wrapList = wrapList;

  return dom;
}
