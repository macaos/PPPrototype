(function () {
	$(document).ready(function () {
		var $cacheSub = $(".macaos-navigation-03 .btn-sub");
		var $overlayMenu = $(".macaos-navigation-03");
		$overlayMenu.on({
			click: function (e) {
				var $this = $(this);
				if ($this.hasClass("open")) {
					$this.removeClass("open");
					menuClose(e);
				} else {
					$this.addClass("open");
					targetLeft = e.pageX - $(this).offset().left;
					menuOpen(e);
				}
			}
		});
		$(".macaos-navigation-03 .btn-main").on({
			mouseout: function (e) {
				if ($overlayMenu.hasClass("open")) {
					menuOpen(e);
				}
			}
		});
		function menuOpen(e) {
			$cacheSub.each(function (i, item) {
				$this = $(this);
				$this.show();
				$this
					.stop()
					.delay(i * 30)
					.animate(
						{
							top: [0, -63, -100, -100, -63, 0][i],
							left: [-100, -100 + 20, -100 + 70, 100 - 70, 100 - 20, 100][i]
						},
						700,
						"easeInOutExpo",
						function () {
							$(this).find(".ku-label").fadeIn(300);
							$overlayMenu.addClass("opened");
						}
					);
			});
		}
		function menuClose(e) {
			var max = $(".macaos-navigation-03 .btn-sub").length;
			$cacheSub.each(function (i, item) {
				$this = $(this);
				$this.find(".ku-label").fadeOut(300);
				$this
					.stop()
					.delay(max * 30 - i * 30)
					.animate(
						{
							top: 0,
							left: 0
						},
						700,
						"easeInOutExpo",
						function () {
							$(this).hide();
							$(".macaos-navigation-03").removeClass("opened");
						}
					);
			});
		}
	});
})();