const FavoritesDragAndDrop = {
	isDragging: false,
	isNotClick: 500,
	isMouseDown: false,
	isDropArea: false,
	elementToMove: '',
	data: {},
	listId: null,
	counter: 0,
	lastMouseMove: 0,
	fps60: 17,

	getItemsData(item) {
		return {
			listId: item.dataset.listid,
			itemId: item.dataset.itemid,
			storedlistitemId: item.dataset.storedlistitemid
		}
	},

	getItemsPosition(item) {
		return {
			itemX: item.getBoundingClientRect().left,
			itemY: item.getBoundingClientRect().top
		}
	},

	getItemsDimention(item) {
		return {
			width: item.getBoundingClientRect().width,
			height: item.getBoundingClientRect().height
		}
	},

	bindDragEvents(items) {
		for (let i = 0; i < items.length; i++) {
			let item = items[i];

			item.addEventListener('mousedown', (e) => {
				this.isMouseDown = true;
				this.isMouseUp = false;
				this.position = this.getItemsPosition(item);
				this.dimentions = this.getItemsDimention(item);
				this.elementToMove = item

				/* check if dragging */
				setTimeout(() => {
					if (this.isMouseUp) return;
					this.isDragging = true;
					this.scope.classList.add('is-dragging');
					this.elementToMove.classList.add('is-dragging');
				}, this.isNotClick);

			});
		}
	},

	dragElement(e) {
		let xAxis = e.clientX - this.position.itemX - (this.dimentions.width * 0.5);
		let yAxis = e.clientY - this.position.itemY - (this.dimentions.height * 0.25);
		this.elementToMove.style.transform = `translate3d(${xAxis}px, ${yAxis}px, 0)`;
	},

	resetElement(element) {
		element.removeAttribute('style');
		element.classList.remove('is-dragging');
		this.scope.classList.remove('is-dragging');
	},

	/* todo implement this function later */
	checkDropArea(e) {
		let matches = e.target.matches ? e.target.matches('.favorites__drop') : event.target.msMatchesSelector('.favorites__drop');
		if (!matches) {
			return false;
		} else {
			return true;
		}
	},

	updateList(e, storedListItemId, oldListId) {
		let matches = e.target.matches ? e.target.matches('.favorites__drop') : event.target.msMatchesSelector('.favorites__drop');
		if (!matches) {
			console.log('cannot drop here');
			return;
		}
		let list = e.target;
		let newListId = parseInt(list.dataset.listid);
		let gridType = parseInt(this.gridTypeId);
		Linksoft.MujKosmas.DoMoveFavoritesItem(gridType, storedListItemId, oldListId, newListId);
		// setTimeout(()=> {
		//     list.classList.remove('is-dragend');
		// },500)
	},

	init() {
		this.scope = document.querySelector('.tabs.favorites')
		if (!this.scope) return;
		this.gridTypeId = parseInt(this.scope.querySelector('.tabs__nav.active ').getAttribute("data-tab-id"));
		const activeGrid = this.scope.querySelector('.tabs__content.active');
		const draggableItems = activeGrid.querySelectorAll('.draggable');
		this.bindDragEvents(draggableItems);

		this.scope.addEventListener('mouseup', (e) => {
			this.isMouseDown = false;
			this.isMouseUp = true;

			if (!this.isDragging) return;

			const draggedItem = activeGrid.querySelector('.draggable.is-dragging');
			if (!draggedItem) return;
			this.resetElement(draggedItem);
			const draggedItemData = this.getItemsData(draggedItem);
			this.updateList(e, draggedItemData.storedlistitemId, draggedItemData.listId);
			this.isDragging = false;
		});

		this.scope.addEventListener('mousemove', (e) => {
			if (this.isMouseDown && this.isDragging && !this.isMouseUp) {
				/* debounce */
				this.isMouseUp = false;
				if (this.lastMouseMove + this.fps60 > Date.now()) return;
				this.lastMouseMove = Date.now();
				this.dragElement(e);
			}
		});
	}
};
FavoritesDragAndDrop.init();
