import { Kefir as K } from "kefir";
import { query, queryOne } from "@standard-library/q-prime";

import { NotFoundException } from "./errors";
import MEMBER_DEFAULTS from "./member";

const LIST_DEFAULTS = {};

function result(subject) {
  return subject === undefined ? K.constantError() : K.constant(e);
}

function queryMaybeBy(sample, finder, selector) {
  return sample
    .map(() => finder(selector))
    .flatMap(result)
    .toProperty()
    .skipDuplicates();
}

function reduceFunctionSet(functions) {
  return element => {
    Object.keys(functions).forEach(name => {
      element[name] = functions[name](element);
    });

    return element;
  };
}

export default function unknot(
  sample,
  { one = queryOne, all = query, member = {}, list = {} } = {}
) {
  const wrap = reduceFunctionSet({ ...MEMBER_DEFAULTS, ...member });
  const wrapList = reduceFunctionSet({ ...LIST_DEFAULTS, ...list });

  const maybe = selector => {
    const element = queryMaybeBy(sample, one, selector);

    return wrap(element);
  };

  const find = selector => {
    const element = maybe(selector);

    element.onError(() => {
      throw new NotFoundException(selector);
    });

    return element;
  };

  const select = selector => {
    const elements = queryMaybeBy(sample, all, selector);

    return wrapList(elements);
  };

  find.maybe = maybe;
  find.wrap = wrap;

  find.list = select;
  find.wrapList = wrapList;

  return find;
}
