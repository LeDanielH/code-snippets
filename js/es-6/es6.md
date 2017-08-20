# FUNCTION

## OLD

```js

	var greet = function(message, name) {
		return message + name;
	}
```

## NEW

```js

	var greet = (message, name) => {
		return message + name;
	}

	/* also I can write it like this */

	var greet = (message, name) => message + name; // don't have to write return

	/* OR */
	var greet = message => message; // message would return message

	/* ANOTHER EXAMPLE */
	var squared = x => x * x;
```

===

# OBJECTS LIKE WE DO

## OLD

```js

	var Person = {
		name: 'Daniel',
		handleMessage: function(message, handler) {
			handler(message)
		},
		recieve: function() {
			var that = this;
			that.handleMessage('Hello, ', function(message) {
				that.name;
				console.log(message + that.name);
			})
		}
	}

	Person.receive();
```

## NEW


```js

	// don't have to use 'that'
	var Person = {
		name: 'Daniel',
		handleMessage: function(message, handler) {
			handler(message)
		},
		recieve: function() {
			this.handleMessage('Hello, ', message => console.log(message + this.name))
		}
	}

	Person.receive();
```

# LET


```js
	var fs = [];

	for(var i; i<10; i++) { // change 'var i' to 'let i'
		fs.push(function() {
			console.log(i);
		});
	}

	fs.forEach(function(f) {
		f(); // with "var i" it will print out 10x10, with "let i" it will print out 1,2,3,4...
	})

```
+ also you can define variables with 'let' keyword inside a for loop


# FUNCTIONS DEFAULT VALUES

```js

	var greet = function(message, name = John) { // if not defined when calling the fn it will default to => undefined "John"
		return message + name;
	}

	greet('Hello'); // it will print out "Hello John"
```

# FUNCTIONS DEFAULT FUNCTIONS

```js

	function receive(complete) {
		complete();
	}
	receive(); // will return undefined

	/* ====================== */

	function receive(complete = function() { console.log('complete'); }) {
		complete();
	}
	receive(); // will return 'complete'

	/* ====================== */

	function receive(complete = () => console.log('complete')) {
		complete();
	}
	receive(); // will return 'complete'

	/* ====================== */

	let receive = (complete = () => console.log('complete')) => complete();
	receive(); // will return 'complete'
```

# CONST
+ variable that won't change, read only
+ useful for api keys for example
+ it's generally useful for the use with numbers


# SHORTHAND

```js

	let firstName = "Daniel";
	let lastName = "Zeman";
	let person = {firstName, lastName};
	console.log(person); // will return {firstName: 'Daniel', lastName: 'Zeman'}
	let mascot = "Bunny";
	let team = {person, mascot}
	console.log(team); // will return the previous object person + mascot

```

# OBJECT ENHANCEMENTS

```js

	var color = 'red';
	var brand = 'Skoda';
	var drive = 'go';
	function go() { // or I can put this inside a car object, see below, shorthand without the word function
		console.log('wroom');
	}

	var Car = {
		color,
		brand,

		go() {
			console.log('wroom'); // result will be the same
		},

		[drive]: function() {
			console.log('wroom');
		}
	}; // don't have to write color: color, brand: brand ...
	console.log(Car.color); // red
	console.log(Car.brand); // Skoda
	Car.go();
```

# SPREAD OPERATOR

+ print array without brackets => `console.log(...[1,2,3]);`
+ `...` are useful when merging arrays, see below

```js

	let first = [1,2,3];
	let second = [4,5,6];
	first.push(...second); // won't be array inside array
	console.log(first); // => [1,2,3,4,5,6]

	function addThreeThings(a, b, c) {
		let result = a + b + c;
		console.log(result);
	}

	addThreeThings(...second); // 15
```

# STRINGS CONCAT
```js

	var salutation = "Hello";
	var greeting = "${salutation}, World";
	console.log(greeting)

	var x = 1;
	var y = 2;
	var equation = '${x} + ${y} = ${x + y}';
	console.log(equation);

	var message = `It\'s ${new Date().getHours()} I\'m sleepy.`;
	console.log(message);

	function tag(strings, ...values) {
		console.log(strings);
		console.log(values);
	}
	var message = tag`It's ${new Date().getHours()} I'm sleepy.`;
	console.log(message);
```

# destructing assignment

```js

	var {color, name} = { // look up the property called color
		color: 'blue',
		name: 'Daniel',
		surname: 'Zeman',
		city: 'Prague'
	}
	console.log(color);

	/*==============*/
	function generateObject() {
		return {
			color: 'blue',
			name: 'Daniel',
			surname: 'Zeman',
			city: 'Prague'
		}
	}

	var {name, city} = generateObject();
	console.log(city);

	/*==============*/

	function generateObject() {
		return {
			color: 'blue',
			name: 'Daniel',
			surname: 'Zeman',
			city: 'Prague'
		}
	}

	var {name:firstName, city:town} = generateObject();
	console.log(firstName);

	/*==============*/

	var [first,,,,fifth] = ['red', 'yellow', 'green', 'blue', 'orange'];
	console.log(first); // red
	console.log(fifth); // orange
	var people = [
		{
			'name': 'Daniel',
			'age': '28'
		},
		{
			'name': 'Adela',
			'age': '27'
		}
	];

	people.forEach(({name}) => console.log(name)); // will print out all the names
	var [,Adela] = people;
	function logAge({age}) {
		console.log(age);
	}

	logAge(Adela);

```

# Array from

```js

	const products = Array.from(document.querySelectorAll('.product'));

```



