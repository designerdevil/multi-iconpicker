(function ($, document) {
	'use strict';
	$(document).on('click', '.dialogue-loaded', function () {
		var $dialog = $('#main');
		var icons = null;
		$dialog.find('.icon-picker').each(function () {
			var $field = $(this);
			var $parent = $field.parents('.coral-Form-fieldwrapper');
			if (icons == null) {
				$.get('./icons.json', function (data) {
					if (data) {
						if (typeof data === 'string') {
							icons = JSON.parse(data);
						} else {
							icons = data;
						}
						bindField($parent, $field, icons);
					}
				});
			} else {
				bindField($parent, $field, icons);
			}
		});
	});

	$(document).on('click', '.cq-dialog-submit', function () {
		$('.informa-icon-picker').remove();
	});

	$(document).on('dialog-success', function () {
		$('.informa-icon-picker').remove();
	});

	$(document).on('dialog-closed', function () {
		$('.informa-icon-picker').remove();
	});

	var binSearch = function (icons, search) {
		var startIndex = 0,
			stopIndex = icons.length - 1,
			middle = Math.floor((stopIndex + startIndex) / 2);

		while (icons[middle].name != search && startIndex < stopIndex) {
			if (search < icons[middle].name) {
				stopIndex = middle - 1;
			} else if (search > icons[middle].name) {
				startIndex = middle + 1;
			}

			middle = Math.floor((stopIndex + startIndex) / 2);
		}

		return icons[middle].name != search ? -1 : middle;
	};

	var bindField = function ($field, $popover, icons) {
		var $input = $field.find('.coral-Form-field--icon');

		var $container = $('<div class="picker-icons-container"></div>');
		var $header = $('<div class="picker-icons-header"></div>');
		var $search = $(
			'<input type="text" placeholder="Search" class="picker-icons-search" />',
		);
		if (
			$('.icon-picker.coral-Popover.informa-icon-picker').find(
				'>.picker-icons-header:nth-child(1)',
			).length == 0 &&
			$('.icon-picker.coral-Popover.informa-icon-picker').find(
				'>.picker-icons-container:nth-child(1)',
			).length == 0
		) {
			$header.append($search);
			$popover.append($header);
			$popover.append($container);
			$popover.addClass('informa-icon-picker');
		}

		$popover.on('click', '.picker-icon', function (e) {
			console.log('icon clicked');
			var $ico_wrapper = $(e.target);
			if ($ico_wrapper.data('icon')) {
				var icon = $ico_wrapper.data('icon');
				$input.val(icon);
				$popover.css('display', 'none');
				$input.after($popover);
				$container.find('.picker-icon').show();
			}
		});

		$search.on('keyup', function () {
			var searchTerm = $search.val();
			if (!searchTerm || searchTerm === '') {
				$container.find('.picker-icon').show();
			} else {
				searchTerm = searchTerm.toLowerCase();
				$container.find('.picker-icon').each(function () {
					var $ico_wrapper = $(this);
					var iconName = $ico_wrapper.data('icon');
					var setName = $ico_wrapper.data('set');
					var set = icons[setName];
					var matches = false;
					if (set) {
						if (iconName.toLowerCase().indexOf(searchTerm) >= 0) {
							matches = true;
						} else {
							var icon = binSearch(set, iconName);
							if (icon.terms) {
								for (var term of icon.terms) {
									if (term.indexOf(searchTerm) >= 0) {
										matches = true;
										break;
									}
								}
							}
						}
						if (!matches) {
							$ico_wrapper.hide();
						} else {
							$ico_wrapper.show();
						}
					}
				});
			}
		});

		var setNames = Object.keys(icons);
		for (var setName of setNames) {
			var set = icons[setName];
			set = set.sort(function (a, b) {
				if (a.name == b.name) {
					return 0;
				}
				return a.name > b.name ? 1 : -1;
			});
			set.forEach(function (icon) {
				var $ico_wrapper = $('<div class="picker-icon"></div>');
				var $ico_label = $('<span class="picker-icon--label"></span>');
				$ico_label.text(icon.label);
				var $ico = $('<i />');

				$ico_wrapper.attr('data-set', setName);
				$ico_wrapper.data('set', setName);
				$ico.attr('data-set', setName);
				$ico.data('set', setName);

				$ico_wrapper.attr('data-icon', icon.name);
				$ico_wrapper.data('icon', icon.name);
				$ico.attr('data-icon', icon.name);
				$ico.data('icon', icon.name);
				$ico.addClass(icon.classes);
				$ico_wrapper.append($ico);
				$ico_wrapper.append($ico_label);
				$container.append($ico_wrapper);
			});
		}
		var $activator = $(
			'<button is="coral-button" class="coral3-Button coral3-Button--secondary" size="M" variant="secondary" title="Open Icon Picker" type="button" aria-label="Open Icon Picker"></button>',
		);
		$activator.html('<span>OPEN</span>');
		var $activator_icon = $(
			'<coral-icon class="coral3-Icon coral3-Icon--sizeS coral3-Icon--filter" icon="filter" size="S" role="img" aria-label="Filter"></coral-icon>',
		);
		var $activator_label = $('<coral-button-label />');
		$activator.append($activator_icon);
		$activator.append($activator_label);
		if (
			$('.coral-Form-fieldwrapper')
				.find('>button')
				.find($('.coral3-Icon--filter')).length == 0
		) {
			$input.after($activator);
		}
		$activator.on('click', function () {
			$('body').append($popover);
			$popover.css('left', $input.offset().left);
			$popover.css('display', 'flex');
			$popover.css('top', $input.offset().top + $input.outerHeight(true));
			$search.val('');
		});
	};
})(jQuery, document);
