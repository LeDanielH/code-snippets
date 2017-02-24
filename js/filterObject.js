function filterObject(obj,newObj) {
	Object.keys(obj).forEach(function (key) {
		console.log(key + " : " + typeof(obj[key]));
		if (key !== "_former") {
			if (typeof(obj[key]) == "object") {
				newObj[key] = {};
				filterObject(obj[key],newObj[key]);
			} else {
				newObj[key] = obj[key];
			}
		}
	});
}