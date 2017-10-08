import { Kefir as K } from "kefir";
import { queryOne } from "@standard-library/q-prime";

import { NotFoundException } from "./errors";

import attribute from "./attribute";
import className from "./className";
import events from "./events";
import style from "./style";

const DEFAULT_FUNCTIONS = {
  attribute,
  className,
  events,
  style
};

const domResult = e => (e === undefined ? K.constantError() : K.constant(e));

const queryMaybeBy = (sample, finder, selector) =>
  sample
    .map(() => finder(selector))
    .flatMap(domResult)
    .toProperty();

const merge = (element, functions) => {
  Object.keys(functions).forEach(name => {
    element[name] = functions[name](element);
  });

  return element;
};

export default function unknot(sample, { one = queryOne } = {}) {
  const domMaybe = selector => {
    const element = queryMaybeBy(sample, one, selector);

    return merge(element, DEFAULT_FUNCTIONS);
  };

  const dom = selector => {
    const element = domMaybe(selector);

    element.onError(e => {
      throw new NotFoundException(selector);
    });

    return element;
  };

  dom.maybe = domMaybe;

  return dom;
}
