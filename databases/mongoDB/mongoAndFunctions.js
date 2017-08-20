var students = [{
	name: "Dale Cooper",
	class: "Calculus",
	tests: [30, 28, 45]
}, {
	name: "Harry Truman",
	class: "Geometry",
	tests: [28, 26, 44]
}, {
	name: "Shelly Johnson",
	class: "Calculus",
	tests: [27, 26, 43]
}, {
	name: "Bobby Briggs",
	class: "College Algebra",
	tests: "[20, 18, 35]"
}, {
	name: "Donna Heyward",
	class: "Geometry",
	tests: [28, 28, 44]
}, {
	name: "Audrey Horne",
	class: "College Algebra",
	tests: [22, 26, 44]
}, {
	name: "James Hurley",
	class: "Calculus",
	tests: [20, 20, 38]
}, {
	name: "Lucy Moran",
	class: "College Algebra",
	tests: [26, 24, 40]
}, {
	name: "Tommy Hill",
	class: "College Algebra",
	tests: [30, 29, 46]
}, {
	name: "Andy Brennan",
	class: "Geometry",
	tests: [20, 21, 38]
}];

var studNames = [];

for (i = 0; i < students.length; i++) {
	studNames.push(students[i].name);
}

studNames;

var studInfo = students.map(function(x) {
	return x.name + ' is in ' + x.class;
});

studInfo;

var tests = [{
	score: 30,
}, {
	score: 28,
}, {
	score: 45
}];

var testSum = tests.reduce(function(sum, tests) {
	return sum + tests.score;
}, 0);

db.classes.insert({
	class: "College Algebra",
	startDate: new Date(2016, 1, 11),
	students: [{
		fName: "Dale",
		lName: "Cooper",
		age: 42
	}, {
		fName: "Laura",
		lName: "Palmer",
		age: 22
	}, {
		fName: "Donna",
		lName: "Hayward",
		age: 21
	}, {
		fName: "Shelly",
		lName: "Johnson",
		age: 24
	}],
	cost: 1500,
	professor: "Rhonda Smith",
	topics: "Rational Expressions,Linear Equations,Quadratic Equations",
	book: {
		isbn: "0321671791",
		title: "College Algebra",
		price: 179.40
	}
});

db.classes.insert({
	class: "Astronomy 101",
	startDate: new Date(2016, 1, 11),
	students: [{
		fName: "Bobby",
		lName: "Briggs",
		age: 21
	}, {
		fName: "Laura",
		lName: "Palmer",
		age: 22
	}, {
		fName: "Audrey",
		lName: "Horne",
		age: 20
	}],
	cost: 1650,
	professor: "Paul Slugman",
	topics: "Sun,Mercury,Venus,Earth,Moon,Mars",
	book: {
		isbn: "0321815351",
		title: "Astronomy: Beginning Guide to Univ",
		price: 129.45
	}
});

db.classes.insert({
	class: "Geology 101",
	startDate: new Date(2016, 1, 12),
	students: [{
		fName: "Andy",
		lName: "Brennan",
		age: 36
	}, {
		fName: "Laura",
		lName: "Palmer",
		age: 22
	}, {
		fName: "Audrey",
		lName: "Horne",
		age: 20
	}],
	cost: 1450,
	professor: "Alice Jones",
	topics: "Earth,Moon,Elements,Minerals",
	book: {
		isbn: "0321814061",
		title: "Earth : An Introduction to Physical Geology",
		price: 130.65
	}
});

db.classes.insert({
	class: "Biology 101",
	startDate: new Date(2016, 1, 11),
	students: [{
		fName: "Andy",
		lName: "Brennan",
		age: 36
	}, {
		fName: "James",
		lName: "Hurley",
		age: 25
	}, {
		fName: "Harry",
		lName: "Truman",
		age: 41
	}],
	cost: 1550,
	professor: "Alice Jones",
	topics: "Earth,Cell,Energy,Genetics,DNA",
	book: {
		isbn: "0547219474",
		title: "Holt McDougal Biology",
		price: 104.30
	}
});

db.classes.insert({
	class: "Chemistry 101",
	startDate: new Date(2016, 1, 13),
	students: [{
		fName: "Bobby",
		lName: "Briggs",
		age: 21
	}, {
		fName: "Donna",
		lName: "Hayward",
		age: 21
	}, {
		fName: "Audrey",
		lName: "Horne",
		age: 20
	}, {
		fName: "James",
		lName: "Hurley",
		age: 25
	}],
	cost: 1600,
	professor: "Alice Jones",
	topics: "Matter,Energy,Atom,Periodic Table",
	book: {
		isbn: "0547219474",
		title: "Chemistry : Matter and Change",
		price: 104.30
	}
});

var mapFunc = function() {
	for(i = 0; i < this.students.length; i++) {
		var student = this.students[i];
		emit(student.fName + " " + student.lName, 1);
	}
};

var reduceFunc = function(student, values) {
	count = 0;
	for(i = 0; i < values.length; i++) {
		count +=values[i];
	}
	return count;
};

db.classes.mapReduce(
	mapFunc,
	reduceFunc,
	{out: "map_ex"}
);
db.map_ex.find();