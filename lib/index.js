import { Kefir as K } from "kefir";
import { queryOne } from "@standard-library/q-prime";

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

const domResult = e => (e === null ? K.constantError() : K.constant(e));

const queryMaybeBy = (sample, selector) =>
  sample
    .map(() => queryOne(selector))
    .flatMap(domResult)
    .toProperty();

const merge = (element, functions) => {
  Object.keys(functions).forEach(name => {
    element[name] = functions[name](element);
  });

  return element;
};

export default function unknot(sample) {
  return selector => {
    const element = queryMaybeBy(sample, selector);

    return merge(element, DEFAULT_FUNCTIONS);
  };
}
