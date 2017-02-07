
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
