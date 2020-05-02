(function () {
	$(document).ready(function () {
		const $naviWrapper = $(".macaos-navigation-04");
		$(".btn-hamburger,.btn-menu").on("click", function (e) {
			if ($naviWrapper.hasClass("menu-show")) {
				$naviWrapper.removeClass("menu-show");
			} else {
				$naviWrapper.addClass("menu-show");
			}
			$(".btn-hamburger").toggleClass("open");
		});
		$(".btn-hamburger").trigger("click");
	});
})();