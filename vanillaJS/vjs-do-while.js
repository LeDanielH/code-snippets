var loopCondition = false;

do {
	console.log("I'm gonna stop looping 'cause my condition is " + loopCondition + "!");
} while (loopCondition);

var x = 0;
var getToDaChoppa = function () {
	do {
		console.log("Get to tha choppa!");
		x++;
	} while (x < 10);
};
getToDaChoppa();


var condition = false;
do {
	console.log("I'm printed once!");
} while (condition);