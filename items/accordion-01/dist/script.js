(function () {
	$(document).ready(function () {
		// init status
		$elm(".macaos-accordion").each(function () {
			uiInit($(this));
			$(this).attr("macaos-init", "true");
		});
		function uiInit($ui) {
			$ui.find(".card").on("click", function () {
				$ui.find(".card").attr("macaos-status", "close");
				$(this).attr("macaos-status", "open");
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
				} else {
					// state close
					$card.attr("macaos-status", "close");
					if (isInit) {
						$card.find(".card-body").slideUp("700", "easeInOutCubic");
					} else {
						$card.find(".card-body").hide();
					}
				}
			});
		}
	});

	// get namespace jquery object
	function $elm(selector) {
		return $(".macaos-accordion-01 " + selector);
	}
})();