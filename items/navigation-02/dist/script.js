(function () {
	$(document).ready(function () {
		var $cacheSub = $(".macaos-navigation-02 .btn-sub");
		var $overlayMenu = $(".macaos-navigation-02");
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

		var targetLeft;
		function menuOpen(e) {
			$cacheSub.each(function (i, item) {
				$this = $(this);
				$this.show();
				$this
					.stop()
					.delay(i * 30)
					.animate(
						{
							top: -53 * (i + 1),
							left: -7 * i + -2 * i * i
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
			var max = $(".macaos-navigation-02 .btn-sub").length;
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
							$(".macaos-navigation-02").removeClass("opened");
						}
					);
			});
		}
	});
})();