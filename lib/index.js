import { Kefir as K } from "kefir";
import { queryOne } from "@standard-library/q-prime";

import attribute from "./attribute";
import className from "./className";
import events from "./events";
import style from "./style";

const domResult = e => (e === null ? K.constantError() : K.constant(e));

const DEFAULT_FUNCTIONS = {
  attribute,
  className,
  events,
  style
};

export default function unknot(sample) {
  return selector => {
    const element = sample
      .map(() => queryOne(selector))
      .flatMap(domResult)
      .toProperty();

    Object.keys(DEFAULT_FUNCTIONS).forEach(name => {
      element[name] = DEFAULT_FUNCTIONS[name](element);
    });

    return element;
  };
}
