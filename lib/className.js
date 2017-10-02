import { Kefir as K } from "kefir";

const toggleClass = (name, element, predicate) => {
  const classes = element.classList;

  if (predicate) {
    classes.add(name);
  } else {
    classes.remove(name);
  }
};

const className = element => (name, predicate) =>
  K.combine([element, predicate]).observe(([e, p]) => {
    toggleClass(name, e, p);
  });

export default className;
