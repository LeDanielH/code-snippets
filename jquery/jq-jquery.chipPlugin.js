import $ from 'jquery';
import { event } from 'rootLib';

export default function () {
	var methods = {

		addChip: function (data) {
			var settings = $.extend({}, $.fn.chip.defaults.addChip, data);
			var randomNumber = settings.id;
			var newId = randomNumber || data.id;
			var newName = settings.name || data.name;
			var $chipsContainer = $(this).find('.chips__container');
			var newChip = '<div class="chip" id="chip-' + newId + '">' + '<p class="chip__content">' + newName + '</p>' +
				'<div class="chip__close"><i class="fa fa-remove"></i></div></div>';
			$chipsContainer.append(newChip);
			// var options = $.extend({}, $.fn.addChip.defaults, parameters);
			$(this).data('chip').push(data || settings);
			return this;
		},

		removeChipById: function (id) {
			var chipsId = id;
			var currentChipsData = $(this).data('chip');
			for (var i = 0; i < currentChipsData.length; i++) {
				if (currentChipsData[i].id == chipsId) {
					currentChipsData.splice(i, 1);
					break;
				}
			}
			var $chipWithId = $(this).find(`.chip[id=chip-${chipsId}]`);
			$chipWithId.remove();
			return this;
		},

		removeChipByClick: function (elem, e) {
			e.stopPropagation(); // modal opens on field click, removed btn for opening modal
			var chipsId = elem.parent().attr("id").replace(/[^0-9\.]+/g, '');
			var $chipsContainer = elem.closest('.chips__wrapper').parent();
			var currentChipsData = $chipsContainer.data('chip');
			if (currentChipsData) {
				var currentChipsDataLength = currentChipsData.length;

				for (var i = 0; i < currentChipsDataLength; i++) {
					if (currentChipsData[i].id == chipsId) {
						currentChipsData.splice(i, 1);
						break;
					}
				}

				$chipsContainer.attr('data-chip', JSON.stringify(currentChipsData));
			}
	

			elem.parent().remove(); 

			// inform about removal
			const eventName = $chipsContainer.attr('data-chip-removed-event-name');
			if (eventName ) { event.trigger(eventName, chipsId); }
		

			return this;
		},

		clearChips: function () {
			var chipsAll = $(this).find('.chip');
			chipsAll.remove();
			$(this).data('chip', []);
			return this;
		},

		showData: function () {
			//console.log($(this), $(this).data('chipsData'));
			return this;
		},

		reload: function() {

			this.chip('clearChips');

			const initialData = JSON.parse($(this).attr('data-chip') || '[]');

            if (initialData && initialData.length > 0) {
                initialData.forEach( (item, index) => {
					this.chip('addChip', item);
                });
            }
		},

		init: function (options) {
			// init for the chip plugin, default
			$(this).data('chip', []);
			var markup = '<div class="chips__wrapper">' +
				'<div class="chips__container"> ' +
				'</div> ' +
				'</div>';
			$(this).append(markup);
			return this;
		},

		domEvents: function () {
			$(document).on('click', '.chip__close', function (e) {
				methods.removeChipByClick($(this),e);
			});
			$(document).on('click', '.chip', function (e) {

				e.stopPropagation();
			});
			return this;
		}
	};
	$.fn.chip = function (options) {
		const self = this;
		const apiArgs = Array.prototype.slice.call(arguments, 1);
		return self.each(function () {
			if (typeof options === 'string' && methods[options]) {
				return methods[options].apply(self, apiArgs);
			} else if (typeof options === 'object' || !options) {
				// Default to "init"
				return methods.init.call(self, options);
			} else {

				$.error('Method ' + options + ' does not exist on jQuery.chip');
			}
		});
	};

	$.fn.chip.defaults = {
		addChip: {
			id: Math.floor(Math.random() * (10000 - 1000)) + 1000,
			name: 'John Doe'
		}
	};

	methods.domEvents();
};

// HOW TO USE

/*
 var newChipSection = $('#chips-1');
 var anotherChipSection = $('#chips-2');

 newChipSection
 .chip() // first we have to initialize before adding functionality

 .chip('addChip', {id: "1", name: "Daniel"})
 .chip('addChip', {id:"2", name: "Alesio"})
 .chip('removeChipById', 1)
 .chip('addChip')
 .chip('addChip', {id: 4, name: 'Maurizzo'})
 .chip('showData');

 anotherChipSection
 .chip() // first we have to initialize before adding functionality

 .chip('addChip', {id: "1", name: "Adela"})
 .chip('addChip', {id:"2", name: "Oliver"})
 .chip('clearChips')
 .chip('addChip', {id: 9, name: 'Phong'})
 .chip('showData');
 */