import { Kefir as K } from "kefir";

const events = element => name =>
  element.flatMapLatest(e => K.fromEvents(e, name));

export default events;
