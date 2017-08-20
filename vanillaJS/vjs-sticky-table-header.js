const StickyTable = {
	debounce: 100,
	lastResize: 0,
	getElements: function () {
		this.sticky = document.querySelector('.sticky');
		if (!this.sticky) return;
		this.scrollTable = this.sticky.parentNode.lastElementChild;
		this.ths = this.sticky.querySelectorAll('th');
		this.tr = this.scrollTable.querySelector('tr');
		this.tds = this.tr.querySelectorAll('td');
	},

	getSizes: function () {
		if (!this.sticky) return;
		this.stickyWidth = this.sticky.getBoundingClientRect().width;
		this.scrollTableWidht = this.scrollTable.querySelector('table').getBoundingClientRect().width;
		this.scrollBarWidth = this.stickyWidth - this.scrollTableWidht;
	},
	setTHwidht: function () {
		if (!this.ths) return;
		for (let i=0; i <= this.ths.length - 1; i++) {
			let width = this.tds[i].getBoundingClientRect().width;
			this.ths[i].style.width = `${width}px`;
		}
	},
	setTableWidth: function () {
		if (!this.sticky) return;
		this.sticky.style.width = this.stickyWidth - this.scrollBarWidth;
		console.log(this.sticky.getBoundingClientRect().width);
	},
	init: function () {
		this.getElements();
		document.addEventListener('resize', () => {
			if (this.lastResize + this.debounce > Date.now()) return;
			this.lastResize  = Date.now();
			this.getElements();
			this.getSizes();
			this.setTableWidth();
			this.setTHwidht();
		});
		document.addEventListener('DOMContentLoaded', () => {
			this.getElements();
			this.getSizes();
			this.setTableWidth();
			this.setTHwidht();
		})
	}
};

export default function () {
	StickyTable.init();
}