Banner.lastMouseMove = 0;

document.addEventListener('mousemove', function (e) {
	if(Banner.lastMouseMove + 20 > Date.now()) return;
	Banner.lastMouseMove = Date.now();
	Banner.turnHeads(e.clientX);
});
