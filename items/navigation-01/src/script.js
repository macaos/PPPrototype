(function () {
	$(document).ready(function () {
		$(".macaos-accordion").each(function () {
			uiInit($(this));
			$(this).attr("macaos-init", "true");
		});
		$(".ku-btn-close").on("click", function (e) {
			$(".macaos-accordion .ku-card").attr("macaos-status", "close");
			uiActive($(".macaos-accordion"));
		});
		function uiInit($ui) {
			$ui.find(".ku-card").on("click", function () {
				$ui.find(".ku-card").attr("macaos-status", "close");
				$(this).attr("macaos-status", "open");
				uiActive($ui);
			});
			uiActive($ui);
		}
		function uiActive($ui, activeIdx) {
			$ui.find(".ku-card").each(function () {
				var $card = $(this);
				var isInit = $ui.attr("macaos-init") == "true";
				console.log(isInit, $ui.attr("macaos-init"), $card.attr("macaos-status"));
				if ($card.attr("macaos-status") == "open") {
					if (isInit) {
						$card.find(".ku-card-body").slideDown("700", "easeInOutCubic");
					} else {
						$card.find(".ku-card-body").show();
					}
				} else {
					$card.attr("macaos-status", "close");
					if (isInit) {
						$card.find(".ku-card-body").slideUp("700", "easeInOutCubic");
					} else {
						$card.find(".ku-card-body").hide();
					}
				}
			});
		}
	});
})();
