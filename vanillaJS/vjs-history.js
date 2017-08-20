(function() {
	'use strict';
	
	function loadPage(xhr, urlToLoad) {
		xhr.onload = function() {
			var response = xhr.responseText;
			parseAndInsertPage(response);
			
			// to activate browsers back button and changing url we write the code bellow
			window.history.pushState({
				pageContent: response
			}, 'Learning JS HISTORY', urlToLoad)
		};
		
		xhr.open('GET', urlToLoad, true);
		xhr.send();
	}
	
	function parseAndInsertPage(pageString) {
		var bodyTemp = pageString.split('<head>')[1];
		var body = bodyTemp.split('</html>')[0];
		document.body.outerHTML = body;
	}
	
	document.addEventListener('click', function(e) {
		if (e.target.nodeName === 'A') {
			e.preventDefault();
			var xhr = new XMLHttpRequest();
			var newUrl = e.target.href;
		}
		loadPage(xhr, newUrl);
		window.history.pushState({
			pageContent: document.body.outerHTML
		}, 'Learning JS HISTORY', document.location.href);
	});
	window.addEventListener('popstate', function(e) {
		if (e.state && typeof e.state.pageContent === 'string') {
			parseAndInsertPage(e.state.pageContent);
		}
	});
}());