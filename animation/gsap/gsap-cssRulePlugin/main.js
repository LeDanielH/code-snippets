var redRule = CSSRulePlugin.getRule (".red");
var greenRule = CSSRulePlugin.getRule (".green");
var blueRule = CSSRulePlugin.getRule (".blue");

TweenMax.to(redRule, 0.5, {
	cssRule: {
		opacity: 1
	},
	ease: Linear.easeNone,
	repeat: -1,
	yoyo: true
});

TweenMax.to(greenRule, 0.5, {
	cssRule: {
		opacity: 1
	},
	ease: Linear.easeNone,
	repeat: -1,
	yoyo: true,
	delay: 0.25
});

TweenMax.to(blueRule, 0.5, {
	cssRule: {
		opacity: 1
	},
	ease: Linear.easeNone,
	repeat: -1,
	yoyo: true,
	delay: 0.50
});