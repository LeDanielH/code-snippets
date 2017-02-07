var Resize = {
    lastResize: 0,
    intervalMs: 300,
    init: function () {
        $(window).on('resize', function () {
            if(Resize.lastResize + intervalMs > Date.now()) return;
	        Resize.lastResize = Date.now();
            // init functions on resize
        });
    }
};
