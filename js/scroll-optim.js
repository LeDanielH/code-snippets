var Scroll = {
    lastScroll: 0,
    intervalMs: 33, // 30fps
    init: function () {
        $(window).on('scroll', function () {
            // add functions you don't want to debounce here, like paralax
            if (Scroll.lastScroll + intervalMs > Date.now()) return;
            Scroll.lastScroll = Date.now();
            // init functions on scroll - debounced
        });
    }
};

