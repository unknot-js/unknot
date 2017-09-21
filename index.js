import { Kefir as K } from "kefir";
import { queryOne } from "@standard-library/q-prime";
import evolve from "@standard-library/kefir-evolve";

const assignStyle = (properties, element) => {
  const propertyNames = Object.keys(properties);

  propertyNames.forEach(name => {
    const value = properties[name];

    if (value !== null) {
      element.style[name] = value;
    } else {
      element.style.removeProperty(name);
    }
  });
}

const domResult = e => (e === null ? K.constantError() : K.constant(e));

export default sample => {
  return selector => {
    let element = sample
      .map(() => queryOne(selector))
      .flatMap(domResult)
      .toProperty();

    element.style = blueprint =>
      K.combine([element, evolve(blueprint, {})]).observe(([e, s]) => {
        assignStyle(s, e);
      });

    element.className = (name, predicate) =>
      K.combine([element, predicate]).observe(([e, p]) => {
        if (p) {
          e.classList.add(name);
        } else {
          e.classList.remove(name);
        }
      });

    element.property = name => element.map(e => e[name]);

    element.events = name => element.flatMapLatest(e => K.fromEvents(e, name));

    return element;
  };
};
