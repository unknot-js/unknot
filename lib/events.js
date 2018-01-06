import { Kefir as K } from "kefir";

const events = element => name => {
  const stream = element.flatMapLatest(e => K.fromEvents(e, name));

  stream.preventDefault = () => stream.observe(e => e.preventDefault());

  return stream;
};

export default events;
