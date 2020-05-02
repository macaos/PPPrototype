(function () {
	$(document).ready(function () {
		// init status
		$$(".macaos-accordion.macaos-control-wrapper").each(function () {
			uiInit($(this));
			$(this).attr("macaos-init", "true");
		});
		function uiInit($ui) {
			$ui.find(".card-header").on("click", function () {
				var $card = $(this).closest(".card");
				var cacheStatus = $card.attr("macaos-status");
				$ui.find(".card").attr("macaos-status", "close");
				if (cacheStatus == "close") {
					$card.attr("macaos-status", "open");
				}

				uiActive($ui);
			});
			uiActive($ui);
		}

		// change active
		function uiActive($ui, activeIdx) {
			$ui.find(".card").each(function () {
				var $card = $(this);
				var isInit = $ui.attr("macaos-init") == "true";
				if ($card.attr("macaos-status") == "open") {
					// state open
					if (isInit) {
						$card.find(".card-body").slideDown("700", "easeInOutCubic");
					} else {
						$card.find(".card-body").show();
					}
					$card.find(".icon-status").removeClass("icon-macaos-plus");
					$card.find(".icon-status").addClass("icon-macaos-minus");
				} else {
					// state close
					$card.attr("macaos-status", "close");
					if (isInit) {
						$card.find(".card-body").slideUp("700", "easeInOutCubic");
					} else {
						$card.find(".card-body").hide();
					}
					$card.find(".icon-status").removeClass("icon-macaos-minus");
					$card.find(".icon-status").addClass("icon-macaos-plus");
				}
			});
		}
	});

	// get namespace jquery object
	function $$(selector) {
		return $(".macaos-accordion-02 " + selector);
	}
})();