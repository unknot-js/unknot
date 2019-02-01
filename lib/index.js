import { Kefir as K } from "kefir";
import { query, queryOne } from "@standard-library/q-prime";

import { NotFoundException } from "./errors";
import MEMBER_DEFAULTS from "./member";

const LIST_DEFAULTS = {};

const domResult = e => (e === undefined ? K.constantError() : K.constant(e));

const queryMaybeBy = (sample, finder, selector) =>
  sample
    .map(() => finder(selector))
    .flatMap(domResult)
    .toProperty()
    .skipDuplicates();

const reduceFunctionSet = functions => {
  return element => {
    Object.keys(functions).forEach(name => {
      element[name] = functions[name](element);
    });

    return element
  }
};

export default function unknot(
  sample,
  { one = queryOne, all = query, member = {}, list = {} } = {}
) {
  const wrap = reduceFunctionSet({ ...MEMBER_DEFAULTS, ...member });
  const wrapList = reduceFunctionSet({ ...LIST_DEFAULTS, ...list });

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
  dom.wrap = wrap

  dom.list = domList;
  dom.wrapList = wrapList

  return dom;
}
