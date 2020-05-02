(function () {
	$(document).ready(function () {
		(function () {
			var $kuWrapper = $(".macaos-popover-01.macaos-wrapper");
			var $popvoer = $elm(".ku-pop-menu");
			$elm(".ku-btn-menu").on("click", function (e) {
				var isOpen = $kuWrapper.data("isOpen");
				if (!isOpen || isOpen == "false") {
					showMenu();
				} else {
					hideMenu();
				}
			});
			$elm(".ku-pop-menu .item").on("click", function () {
				hideMenu();
			});
			$(document).on("mousedown", function (e) {
				hideMenu();
			});
			function $elm(selector) {
				return $(".macaos-popover-01 " + selector);
			}
			function showMenu() {
				$popvoer.css({
					opacity: 0,
					top: 100
				});
				$popvoer.show();
				$popvoer.stop().animate(
					{
						opacity: 1,
						top: 70
					},
					500,
					"easeInOutExpo"
				);
				$kuWrapper.data("isOpen", "true");
			}
			function hideMenu() {
				$popvoer.stop().animate(
					{
						opacity: 0,
						top: 100
					},
					500,
					"easeInOutExpo",
					function () {
						$popvoer.hide();
						$kuWrapper.data("isOpen", "false");
					}
				);
			}
		})();
	});
})();