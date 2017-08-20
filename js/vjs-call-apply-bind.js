// apply
var User = { name: 'Daniel', age: 28 };
function showUserData() { console.log('Name is ' + this.name + ' and is ' + this.age); };
showUserData.apply(User);

// apply
var gameController = {
    scores: [20, 34, 55, 46, 77],
    avgScore: null,
    players: [{ name: "Tommy", playerID: 987, age: 23 }, { name: "Pau", playerID: 87, age: 33 }]
}
var appController = {
    scores: [900, 845, 809, 950],
    avgScore: null,
    avg: function () {
        var sumOfScores = this.scores.reduce(function (prev, cur, index, array) {
            return prev + cur;
        });
        this.avgScore = sumOfScores / this.scores.length;
    }
}
appController.avg.apply(gameController, gameController.scores); //  second parameter is optional
appController.maxNum = function () {
    this.avgScore = Math.max.apply(null, this.scores);
}
appController.maxNum.apply(gameController, gameController.scores);
console.log(gameController.avgScore);
console.log(appController.avgScore); // is still null, wasn't modified

// apply - variadic functions
var allNumbers = [23, 11, 34, 56];
console.log(Math.max(23, 11, 34, 56)); // 56
console.log(Math.max(allNumbers)); // Nan
console.log(Math.max.apply(null, allNumbers)); // 56

// apply
var students = ["Peter Alexander", "Michael Woodruff", "Judy Archer", "Malcolm Khan"];
function welcomeStudents() {
    var args = Array.prototype.slice.call(arguments);
    var lastItem = args.pop();
    console.log('Welcome ' + args.join(', ') + ' and ' + lastItem + ',');
}
welcomeStudents.apply(null, students);

// bind
var othercars = {
    showData: function (event) {
        var randomNum = ((Math.random() * 2 | 0) + 1) - 1;
        console.log(this.data[randomNum].name + " " + this.data[randomNum].age);
    }
}
var cars = {
    data: [{ name: "Honda Accord", age: 14 }, { name: "Tesla Model S", age: 2 }]
}
cars.showData = othercars.showData.bind(cars); // this can potentially overwrite cars.showdata if it exists
cars.showData();

// bind
function greet(gender, age, name) {
    var salutation = gender === "male" ? "Mr. " : "Ms. ";
    if (age > 25) { return "Hello, " + salutation + name + "."; }
    else { return "Hey, " + name + "."; }
}
greetMale = greet.bind(null, 'male', 22);
console.log(greetMale('Daniel'));

// call - gives us ability to use array methosds on object
var anArrayLikeObj = { 0: "Martin", 1: 78, 2: 67, 3: ["Letta", "Marieta", "Pauline"], length: 4 };
var newArray = Array.prototype.slice.call(anArrayLikeObj, 1); // skip the first item
console.log(newArray);

// call
function transitionTo() {
    var args = Array.prototype.slice.call(arguments, 1); // skip first item
    console.log(args);
}
transitionTo("contact", "Today", "20");
