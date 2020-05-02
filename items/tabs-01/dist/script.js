(function () {
	$(document).ready(function () {
		$(".nav-item").on("click", function (e) {
			var $this = $(this);
			var id = $this.attr("rel");
			$this.closest(".macaos-tabs-01").find(".nav-item").removeClass("active");
			$this.addClass("active");
			$this.closest(".macaos-tabs-01").find(".tab-pane").removeClass("active");
			$this
				.closest(".macaos-tabs-01")
				.find(".tab-pane#" + id)
				.addClass("active");
		});
	});
})();