# unknot

Unknot is an experiment combining FRP patterns with DOM querying, to attempt to remove the complexity of the page lifecycle when declaring relationships between events and DOM manipulation.

Unknot is implemented using Kefir, and the examples below assume some knowledge of a Functional Reactive Programming library (TODO: make this not so).

The goal is to create a declarative environment for smaller applications that don't require the complexity of React (or the view rendering); where jQuery might be the tool of choice for adding a handful of interactions to the page.

## Why?

Often, when setting up any client-side JavaScript, program setup is deferred until after the DOM content is loaded on the page to ensure that elements exist before they are queried.

```javascript
# With jQuery as $:
$(document).on("ready", () => {
  let $foo = $(".foo");

  $foo.css({
    backgroundColor: "red"
  });
});
```

Unknot takes an alternative approach, allowing queries to be defined before page load, and delaying any manipulations until it is possible to do so.

```javascript
# With Unknot as $:
const $foo = $(".foo");

$foo.style({
  backgroundColor: Kefir.constant("red")
});
```

Unknot understands when it is possible to apply the declared styles, and doesn't attempt to assign them until the appropriate moment. In addition, styles are defined as observables, so any time the style-state is updated, the new styles are applied.

## Events

Event handlers can also be defined before the DOM has finished loading, using the `events` method.

For example, a small program that changes the opacity of an element when it is clicked:

```javascript
# With jQuery as $:
$(document).on("ready", () => {
  let $foo = $(".foo");

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

## Classes

TODO: Applying conditional classes

## Properties

TODO: Reading properties from DOM nodes

## Missing elements

If elements are not present in the document, any manipulations or attribute accesses are ignored.

For example, using jQuery, you might check if an element exists before getting some information about it, and then conditionally applying the result:

```javascript
# With jQuery as $:
$(document).on("ready", () => {
  let $slideshow = $(".slideshow");

  if ($slideshow.length) {
    complexSetup($slideshow);
  }
});

# With Unknot as $:
const $slideshow = $(".slideshow");

$slideshow.observe(complexSetup);
```

With Unknot, if the element is not found, any downstream code is skipped, without needing to check for the element's  existence using a conditional.
