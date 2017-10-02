# unknot

Unknot is an experiment combining FRP patterns with DOM querying, to attempt to remove the complexity of the page lifecycle when declaring relationships between events and DOM manipulation.

Unknot is implemented using the [Kefir](https://rpominov.github.io/kefir), and the examples below assume some knowledge of Functional Reactive Programming patterns (TODO: make this not so).

The goal is to create a declarative environment for smaller applications that don't require the complexity of React (or the view rendering); where jQuery might be the tool of choice for adding a handful of interactions to the page.

## Why?

Often, when setting up any client-side JavaScript, program setup is deferred until after the DOM content is loaded on the page to ensure that elements exist before they are queried.

```javascript
# With jQuery as $:
$(document).on("ready", () => {
  const $foo = $(".foo");

  $foo.css({
    backgroundColor: "red"
  });
});
```

Unknot takes an alternative approach, allowing queries and transformations to be defined before page load, and delaying any manipulations until it is possible to do so.

```javascript
# With Unknot as $:
const $foo = $(".foo");

$foo.style({
  backgroundColor: Kefir.constant("red")
});
```

Unknot understands when it is possible to apply the declared styles, and doesn't attempt to assign them until the appropriate moment. In addition, styles are defined as observables, so any time the style-state is updated, the new styles are applied.

## Setup

The above example is somewhat simplified, as it omits two lines of required setup code necessary for unknot programs. Unknot still needs to know when queries should be attempted, and doesn't make assumptions about this by default. This information is supplied as an event stream passed to the `unknot` function. In most cases, the following setup code is sufficient to begin your unknot program:

```javascript
import unknot from "unknot";

// Watch the document for the first `DOMContentLoaded` event as an event stream.
const loaded = Kefir.fromEvents(document, "DOMContentLoaded").take(1);

// Supply the `loaded` event stream to `unknot` to create the query function.
// $ can be named anything that makes sense for your application.
const $ = unknot(loaded);
```

From this point, you can use the query function `$` (or the name you choose) in the rest of your program without using callbacks.

## API

### Styles

CSS styles are applied to an element using the `style` method.

```javascript
// With jQuery as $:
$(document).on("ready", () => {
  const $foo = $(".foo");

  $foo.css({
    backgroundColor: "red"
  });
});

// With Unknot as $:
const $foo = $(".foo");

$foo.style({
  backgroundColor: Kefir.constant("red")
});
```

Rather than suppling an object literal of CSS rules to be applied once, unknot expects each value in the object to be a property stream (this is why `Kefir.constant` is used above, as it returns a property stream with a single, unchanging value). As the property's value changes, the rules are reapplied to the element with the new style definition.

```javascript
// With jQuery as $:
$(document).on("ready", () => {
  const $foo = $(".foo");
  const colors = ["red", "green", "blue"];

  setInterval(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    $foo.css({
      backgroundColor: randomColor
    });
  }, 1000)
});

// With Unknot as $:
const $foo = $(".foo");
const colors = ["red", "green", "blue"];
const randomColor = Kefir.fromPoll(
  1000,
  () => colors[Math.floor(Math.random() * colors.length)]
);

$foo.style({
  backgroundColor: randomColor
});
```

When a property stream emits `null`, the corresponding CSS attribute is removed.

```javascript
// Sets initial value to `red`, then removes `backgroundColor` after 5 seconds
$foo.style({
  backgroundColor: Kefir.later(5000, null).toProperty(() => "red")
});
```

The `style` method should only be called once per element.

### Events

Event handlers streams can be defined using the `events` method. Event handlers can also be defined before the DOM has finished loading.

For example, a small program that changes the opacity of an element to zero when it is clicked:

```javascript
# With jQuery as $:
$(document).on("ready", () => {
  const $foo = $(".foo");

  $foo.on("click", () => {
    $foo.css({
      opacity: 0
    });
  });
});

# With Unknot as $:
const $foo = $(".foo");
const clicks = $foo.events("click");

$foo.style({
  opacity: clicks.map(() => 0)
});
```

### Classes

TODO: Applying conditional classes

### Properties

TODO: Reading properties from DOM nodes

## Missing elements

If elements are not present in the document, any manipulations or attribute accesses are ignored.

For example, using jQuery, you might check if an element exists before getting some information about it, and then conditionally applying the result:

```javascript
# With jQuery as $:
$(document).on("ready", () => {
  const $slideshow = $(".slideshow");

  if ($slideshow.length) {
    complexSetup($slideshow);
  }
});

# With Unknot as $:
const $slideshow = $(".slideshow");

$slideshow.observe(complexSetup);
```

With Unknot, if the element is not found, any downstream code is skipped, without needing to check for the element's  existence using a conditional.
