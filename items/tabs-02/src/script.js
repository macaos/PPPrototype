(function () {
	$(document).ready(function () {
		var wrapperWidth = $(".macaos-tabs-02").width();
		var menuWidth = 80;
		setActive($(".nav-item.active"));
		$(".nav-item").on("click", function (e) {
			setActive($(this));
		});

		init();
		function init() {
			$(".tab-content").width(wrapperWidth * 4);
			$(".tab-content .tab-pane").css("width", wrapperWidth);
			$(".btn-group").width(menuWidth * $(".tab-content .tab-pane").length);
		}
		function setActive($el) {
			var id = $el.attr("rel");
			var idx = parseInt($el.attr("idx"));
			$el.closest(".macaos-wrapper").find(".nav-item").removeClass("active");

			$el.addClass("active");

			$el.closest(".macaos-wrapper").find(".tab-pane").removeClass("active");

			$el
				.closest(".macaos-wrapper")
				.find(".tab-pane#" + id)
				.addClass("active");

			$(".nav-active .underline").animate(
				{
					left: menuWidth * (idx - 1)
				},
				700,
				"easeInOutExpo"
			);
			$(".tab-content").animate(
				{
					left: wrapperWidth * -(idx - 1)
				},
				700,
				"easeInOutExpo"
			);
		}
	});
})();
