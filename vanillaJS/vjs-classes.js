// original classes
function Animal(name, numLegs) {
	this.name = name;
	this.numLegs = numLegs;
	this.isAlive = true;
}

function Penguin(name) {
	this.name = name;
	this.numLegs = 2;
}

function Emperor(name) {
	this.name = name;
	this.saying = "Waddle waddle";
}
// set up the prototype chain
Penguin.prototype = new Animal();
Emperor.prototype = new Penguin();
var myEmperor = new Emperor("Jules");
console.log(myEmperor.saying); // should print "Waddle waddle"
console.log(myEmperor.numLegs); // should print 2
console.log(myEmperor.isAlive); // should print true

function Person(first, last, age) {
	this.firstname = first;
	this.lastname = last;
	this.age = age;
	var bankBalance = 7500;
	this.getBalance = function () {
		// your code should return the bankBalance
	};
}

var john = new Person('John', 'Smith', 30);
console.log(john.bankBalance); // it's not a public method, it's private only.

// create a new variable myBalance that calls getBalance()
this.getBalance = function () {
	// your code should return the bankBalance
	return bankBalance
};

var john = new Person('John', 'Smith', 30);
console.log(john.bankBalance); // it's not a public method, it's private only.
// create a new variable myBalance that calls getBalance()
var myBalance = john.getBalance();
console.log(myBalance); //it works because we used the function to make "bankBalance" public.
function Person(first, last, age) {
	this.firstname = first;
	this.lastname = last;
	this.age = age;
	var bankBalance = 7500;

	var returnBalance = function () {
		return bankBalance;
	};

	// create the new function here
	this.askTeller = function () {
		return returnBalance;
	};
}
var john = new Person('John', 'Smith', 30);
console.log(john.returnBalance);
var myBalanceMethod = john.askTeller();
var myBalance = myBalanceMethod();
console.log(myBalance);

var Person = function (name, age) {
	this.name = name;
	this.age = age;
};

var family = [];
family[0] = new Person("alice", 40);
family[1] = new Person("bob", 42);
family[2] = new Person("michelle", 8);
family[3] = new Person("timmy", 6);

for (var i = 0; i < family.length; i++) {
	console.log(family[i].name);
}