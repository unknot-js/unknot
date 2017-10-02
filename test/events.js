import test from "tape";
import { Kefir as K } from "kefir";
import EventEmitter from "events";

import events from "../lib/events.js";

test("records an event", t => {
  const pool = new EventEmitter();
  const element = K.constant(pool);
  const clicks = events(element)("click");

  clicks.observe(() => {
    t.ok(true);
    t.end();
  });

  pool.emit("click");
});
