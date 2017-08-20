function StaffMember(name, discountPercent) {
	this.name = name;
	this.discountPercent = discountPercent;
}
var sally = new StaffMember("Sally", 5);
var bob = new StaffMember("Bob", 10);
// Create yourself again as 'me' with a staff discoul;;t of 20%
var me = new StaffMember("Daniel", 20);
var cashRegister = {
	total: 0,
	lastTransactionAmount: 0,
	add: function (itemCost) {
		this.total += (itemCost || 0);
		this.lastTransactionAmount = itemCost;
	},
	scan: function (item, quantity) {
		switch (item) {
		case "eggs":
			this.add(0.98 * quantity);
			break;
		case "milk":
			this.add(1.23 * quantity);
			break;
		case "magazine":
			this.add(4.99 * quantity);
			break;
		case "chocolate":
			this.add(0.45 * quantity);
			break;
		}
		return true;
	},
	voidLastTransaction: function () {
		this.total -= this.lastTransactionAmount;
		this.lastTransactionAmount = 0;
	},
	// Create a new method applyStaffDiscount here
	applyStaffDiscount: function (employee) {
		this.total = (this.total * ((100 - employee.discountPercent) / 100));
	}
};

cashRegister.scan('eggs', 1);
cashRegister.scan('milk', 1);
cashRegister.scan('magazine', 3);
// Apply your staff discount by passing the 'me' object 
// to applyStaffDiscount

cashRegister.applyStaffDiscount(me);

// Show the total bill
console.log('Your bill is ' + cashRegister.total.toFixed(2));

//var cashRegister = {
//	total: 0,
//	add: function (itemCost) {
//		this.total += itemCost;
//	}
//};
////call the add method for our items
//console.log("Eggs " + cashRegister.add(0.98));
//console.log("Milk " + cashRegister.add(1.23));
//console.log("Magazine " + cashRegister.add(4.99));
//console.log("Chocolate " + cashRegister.add(0.45));
////Show the total bill
//console.log('Your bill is ' + cashRegister.total);

