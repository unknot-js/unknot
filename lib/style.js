import { Kefir as K } from "kefir";
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
};

const style = element => blueprint =>
  K.combine([element, evolve(blueprint, {})]).observe(([e, s]) => {
    assignStyle(s, e);
  })

export default style;
