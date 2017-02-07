let first = [1, 2, 3];
let second = [4, 5, 6];
first.push(...second); // won't be array inside array
console.log(first);

function addThreeThings(a, b, c) {
    let result = a + b + c;
    console.log(result);
}
addThreeThings(...second); // 15

var [first, , , , fifth] = ['red', 'yellow', 'green', 'blue', 'orange'];
console.log(first); // red
console.log(fifth); // orange
