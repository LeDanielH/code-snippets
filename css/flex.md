+ display: flex = block level element
+ display: inline-flex = inline block element
+ display: row-reverse
+ display: column-reverse
+ default `align-items` is `stretch` => all childreb will stretch
+ checkout 'align-items: baseline'

# FLEX BASIS
+ defaults to `auto`
+ when `flex-direction: row`, `flex-basis` = `width`
+ when `flex-direction: column`, `flex-basis` = `height`
+ will overwrite the set `width`, will not exceed the `max-width` or go into the `min-width`
+ it is recommended to use `flex-basis` instead of `width` or `height` depending on the `flex-direction`
+ default `flex-shrink: 1;`, which means items can go below `flex-basis` if there is not enough space

```css

	flex: 1;
    /* flex-grow: 1;
       flex-shrink: 1;
       flex-basis: 0;
    */

  flex: 20px;
  /* flex-grow: 1;
     flex-shrink: 1;
     flex-basis: 20px;
  */

  flex: 0 80px;
  /* flex-grow: 0;
     flex-shrink: 1;
     flex-basis: 80px;
  */

```

# ALIGN CONTENT
+ used only with multiline content, e.g. when `flex-wrap: wrap`
+ won't do anything on one line content
