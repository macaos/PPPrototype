(function () {
	$(document).ready(function () {
		$elm(".kareui-btn-menu")
			.on("mouseenter", function (e) {
				openMenu($(this));
			})
			.on("mouseleave", function () {
				closeMenu($(this));
			})
			.on("click", function () {
				var $this = $(this);
				if ($this.data("status") === "open") {
					closeMenu($this);
				} else {
					openMenu($this);
				}
			});
	});
	function openMenu($el) {
		$el.data("status", "open");
		$elm(".mask").height($elm(".kareui-sub-menu").height() + 10);
		$elm(".kareui-sub-menu").stop().animate(
			{
				top: -5
			},
			700,
			"easeInOutExpo"
		);
	}
	function closeMenu($el) {
		$el.data("status", "close");
		$elm(".kareui-sub-menu")
			.stop()
			.animate(
				{
					top: -325
				},
				700,
				"easeInOutExpo",
				function () {
					$elm(".mask").height(1);
				}
			);
	}
	function $elm(selector) {
		return $(".kareui-dropdown-01 " + selector);
	}
})();
