var newText = "Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum.",
	textChangeP = $('.textChange'),
	btn = $('.readmore')
;

btn.click(function () {
	TweenMax.to(textChangeP, 10, {
		text: {
			value: newText,
			delimiter: ' '
		}
	});
});

