let firstName = "Daniel";
let lastName = "Zeman";
let person = { firstName, lastName };
console.log(person); // will return {firstName: 'Daniel', lastName: 'Zeman'}

let mascot = "Bunny";
let team = { person, mascot }
console.log(team); // will return the previous object person + mascot


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

    [drive]: function () {
        console.log('wroom');
    }
}; // don't have to write color: color, brand: brand ...
console.log(Car.color); // red
console.log(Car.brand); // Skoda
Car.go();
