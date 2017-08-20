# ACCESSIBILITY

+ hiding text for icon buttons - still accessible by screen reader - use `visuallyhidden`
+ use ```aria-hidden="true"``` to hide elements from screenreader
+ use ```role="button" tabindex="0"```, for example when button is a ```<div>``` and you wanted to be accessible by screen reader and keyboard
	- also use attribute ```aria-label="Menu"``` if button is a hamburger
	- add keydown event on 'div' buttons because they still won't be accessible by keyboard users

+ add ```aria-labelledby="svgtitle"``` attribute to ```<svg>``` and ```<title>``` with ```id="svgtitle"```, will be accessible by screen reader
+ wrap 'input' in 'label' to link text with the input for screen readers
	- also when clicking on the label, focus will trigger on the field
	- ```<label for="inputId">``` + ```<input id="inputId">``` also helps
	- using fieldset and legend instead of 'p' tag for the heading will help give context to the form

+ don't forget to add focus to another element when one dissapears

```css
	[tabindex="-1"] {
		outline: 0;
	}
```




