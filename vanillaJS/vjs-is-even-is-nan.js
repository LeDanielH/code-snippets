var isEven = function (number) {
	if (number % 2 === 0) {
		return true;
	} else if (isNaN(number)) {
		return ("Your input is not a number.");
	} else {
		return false;
	}
};
console.log(isEven(4));