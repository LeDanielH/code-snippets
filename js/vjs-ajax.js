(function() {
	'use strict';
	var xhr = new XMLHttpRequest();
//	xhr.onload = function() {
//		console.log(JSON.parse(xhr.responseText));
//	};
//	console.log(xhr); // prints all the methods and properties of xhr
	xhr.onreadystatechange = function() { // will happen if the open/send/... method is called
		if (xhr.readyState === 4) { // number 4 is the only state wea re interested in - happens when the request returns
			console.log(JSON.parse(xhr.responseText));
		}
	};
	xhr.withCredentials = true; // any cookies that the server might require will be send along with the request
	xhr.open('GET', 'js/data.json');
	xhr.send();
}());