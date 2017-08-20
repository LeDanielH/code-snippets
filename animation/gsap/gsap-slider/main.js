var slides = $(".slide").toArray(),
    active = 0,
    next = 1,
    prev = slides.length - 1,
    activePosition = 150,
    spacing = 210;

var positions = {
    ACTIVE: activePosition,
    PREV: activePosition - spacing,
    NEXT: activePosition + spacing,
    UP: activePosition - spacing * 2,
    DOWN: activePosition + spacing * 2
};

function setUpSlides() {
    TweenMax.set(slides, { top: positions.DOWN });
    TweenMax.set(slides[active], { top: positions.ACTIVE });
    TweenMax.set(slides[next], { top: positions.NEXT });
    TweenMax.set(slides[prev], { top: positions.PREV });
}

function animateSlides(isNext) {
    var onDeck,
        currentSlides = [];
    
    if (isNext) {
        onDeck = (next + 1) % slides.length;
        currentSlides = [slides[prev], slides[active], slides[next], slides[onDeck]];
        TweenMax.set(slides[onDeck], { top: positions.DOWN });
    } else {
        onDeck = ((prev - 1) < 0) ? slides.length - 1 : prev - 1;
        currentSlides = [slides[next], slides[active], slides[prev], slides[onDeck]];
        TweenMax.set(slides[onDeck], { top: positions.UP });
    }
   

    currentSlides.forEach(function(item, index) {
    	var top;
        
        switch(index) {
            case 0:
                top = isNext ? positions.UP : positions.DOWN;
                break;
            case 1:
                top = isNext ? positions.PREV : positions.NEXT;
                break;
            case 2:
                top = positions.ACTIVE;
                break;
            case 3:
                top = isNext ? positions.NEXT : positions.PREV;
                break;
            default:
                break;
        }
        
        TweenMax.to(currentSlides[index], 2, {
           top: top,
           ease: Elastic.easeOut,
           delay: index * 0.1
        });

    });
    if (isNext) {
        prev = active;
        active = next;
        next = onDeck;
    } else {
        next = active;
        active = prev;
        prev = onDeck;
    }
    
}

setUpSlides();

$('.next').click(function() {
	animateSlides(true);
});


$('.prev').click(function() {
	animateSlides(false);
});