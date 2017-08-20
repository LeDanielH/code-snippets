/*

	TO USE THIS SCRIPT

	1. this script targets all lins in this format
		<a href="#name">,

		where name is simply the id of a section you want to scroll to =>
		<section id="name"></section>

	2. therefore all other links cannot start with '#'.
		If they are empty links, simply add
		<a href="javascript:void(0);"> to it.

	4. if you want to use this script as callback, you can replace 'finish' argument by specific target in this format: '#targetname'

*/

var SmoothScroll = {
    nav: $('.nav__wrapper'),
    $target: '',
    duration: 1700,

    toSection: function (duration, finish) {
        SmoothScroll.$target = finish;
        var navHeight = SmoothScroll.nav.height();
        var targetOffset = $(SmoothScroll.$target).offset().top;
        var maxScroll = document.body.scrollHeight - $(window).height();
        var scroll = Math.min(targetOffset - navHeight, maxScroll);

        if (SmoothScroll.$target.length) {
            $('html, body').animate({
                scrollTop: scroll
            }, duration, 'easeInOutCubic');
            console.log(SmoothScroll.$target);
        }
    },

    init: function () {
        SmoothScroll.vars();
        $('a[href^="#"]').on('click', function (e) {
            if (!finish) {
                var finish = $($(this).attr('href'));
            } else {
                var finish = finish;
            }
            e.preventDefault();
            SmoothScroll.toSection(SmoothScroll.duration, finish);
        });
    }
};
