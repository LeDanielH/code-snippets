var coinFace = Math.floor(Math.random() * 2);
while (coinFace === 0) {
	console.log("Heads! Flipping again...");
	coinFace = Math.floor(Math.random() * 2);
}
console.log("Tails! Done flipping.");
/*
while the coin came up heads (when coinFace equaled 0), it would flip again,
and it would stop flipping once it got tails (when coinFace was 1).
Since the flip was random, we didn't know ahead of time how many loops we'd need.
*/

var understand = true;
while (understand === true) {
	console.log("I'm learning while loops!");
	var understand = false;
}

// we can use 1 and 0 instead of true and false + shorten the while loop like this:
var understand = 1;
while (understand) {
	console.log("I'm learning while loops!");
	understand = 0;
}

var count = 0;
var loop = function () {
	while (count < 3) {
		count++;
		console.log("I'm looping!");
	}
};
loop();