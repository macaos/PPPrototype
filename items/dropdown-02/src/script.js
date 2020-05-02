(function ($) {
	$(document).ready(function () {
		function Component(option) {
			return this.each(function () {
				var $btn = $(this).closest(".ku-btn-dropdown");
				if ($btn.attr("ku-init") == "true") {
				} else {
					var dataID = $btn.attr("id");
					var $relation = $(
						'.ku-dropdown-items[relation-id="' + dataID + '"]'
					).show();
					$btn.append($relation.detach());
					console.log($relation);
					$relation.wrap('<div class="ku-dropdown-bubble"></div>');
					$btn.attr("ku-init", "true");
				}
				if ($btn.attr("ku-status") == "show") {
					hide();
				} else {
					show($btn);
				}
			});
		}
		function show($btn) {
			$(document).on("mousedown.ku.dropdown.cd01", mousedownHandler);
			var $bubble = $btn.find(".ku-dropdown-bubble");
			var btnOffset = $btn.offset();
			$bubble.css({
				top: btnOffset.top + $btn.height(),
				left: btnOffset.left
			});
			$bubble.show();
			$btn.attr("ku-status", "show");
		}
		function hide() {
			$(".ku-dropdown-bubble").hide();
			$(".ku-btn-dropdown").attr("ku-status", "hide");
		}
		$.fn.dropdown = Component;
		var mousedownHandler = function (e) {
			if ($(e.target).closest(".ku-btn-dropdown").length < 1) {
				hide();
			}
		};
		var clickHandler = function (e) {
			e.preventDefault();
			Component.call($(this), "show");
		};
		$(".ku-btn-dropdown>.btn").on("click.ku.dropdown", clickHandler);
		// $('.ku-btn-dropdown>.btn').trigger('click.ku.dropdown');
	});
})(jQuery);
