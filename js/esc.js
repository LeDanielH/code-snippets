var Esc =  {
	init: function() {
		$(document).keyup(function(e) {
			console.log(e);
			if (e.keyCode == 27) {
				Projects.close();
				// add other functions
			}
		});
	}
};
