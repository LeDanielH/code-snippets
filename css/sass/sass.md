+ can add default values to mixins

```sass

	@mixin backface-visibility($visibility: hidden) {
		backface-visibility: $visibility;
		-webkit-backface-visibility: $visibility;
		-moz-backface-visibility: $visibility;
		-ms-backface-visibility: $visibility;
		-o-backface-visibility: $visibility;
	}

	.front, .back {
		@include backface-visibility();
	}

```

+ checkout the 'object fit property'

```sass

	@mixin photo-content($file) {
		content: url(#{$file}.jpg);
		object-fit: cover;
	}
```

## BUILT-IN FUNCTIONS

+ fade-out

```sass

	$lagoon-blue: fade-out(#62fdca, 0.5);

	.math {
		background-color: $lagoon-blue; // rgba(98, 253, 202, 0.5);
	}
```

+ fade-in

```sass

	$color: rgba(55,7,56, 0.5);
	$amount: 0.1;
	$color2: fade-in($color, $amount); //rgba(55,7,56, 0.6)
```

## CALCULATIONS

+ can add colors

```sass
	.math {
		color: red + blue; // purple
	}
```

+ don't multiply units

```sass

	// 10px * 10px = 100px * px => error
	// 10px * 10 = 100px => correct
```

## LOOPS

+ each

```sass

	$list: (orange, purple, teal);
	@each $item in $list {
		.#{$item} {
			background: $item;
		}
	}

```

+ for with conditionals
+ width: if( $condition, $value-if-true, $value-if-false);

```sass

	$total: 10; //Number of .ray divs in our html
	$step: 360deg / $total; //Used to compute the hue based on color-wheel

	.ray {
		height: 30px;
	}

	/* WITH CONDITIONAL */
	@for $i from 1 through $total {
		.ray:nth-child(#{$i}) {
			background: adjust-hue(blue, $i * $step);
			width: if($i % 2 == 0, 300px, 350px);
			margin-left: if($i % 2 == 0, 0px, 50px);
		}
	}
```

















