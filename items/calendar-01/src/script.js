(function () {
	$(document).ready(function () {
		addEvent();
		buildCalendar();
	});
	function addEvent() {
		$elm("#btn-prev").on("click", function () {
			prevCalendar();
		});
		$elm("#btn-next").on("click", function () {
			nextCalendar();
		});
	}
	function $el(el) {
		if (typeof el == "string") {
			$el = $(el);
		} else {
			$el = el instanceof jQuery ? el : $(el);
		}
		return $el;
	}
	function $elm(selector) {
		return $(".macaos-calendar-01 " + selector);
	}
	var today = new Date();
	var date = new Date();
	function prevCalendar() {
		today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
		buildCalendar();
	}
	function nextCalendar() {
		today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
		buildCalendar();
	}
	function buildCalendar() {
		var doMonth = new Date(today.getFullYear(), today.getMonth(), 1);
		var lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
		$("#calendar>tbody").html("");
		$("#str-year").text(today.getFullYear());
		$("#tb-calendar-ym").text(
			[
				"JAN",
				"FEB",
				"MAR",
				"APR",
				"MAY",
				"JUN",
				"JUL",
				"AUG",
				"SEP",
				"OCT",
				"NOV",
				"DEC"
			][today.getMonth()]
		);
		// before day
		var $currentTR = $("<tr></tr>");
		var day = 0;
		for (i = 0; i < doMonth.getDay(); i++) {
			day++;
			$currentTR.append("<td></td>");
		}
		$("#calendar-body").append($currentTR);
		// date start
		for (i = 1; i <= lastDate.getDate(); i++) {
			var $td;
			// var day = i+1;
			if (day % 7 == 1) {
				// sun
				$td = $('<td><span class="sun">' + i + "</td>");
			} else if (day % 7 == 0) {
				// sat
				$td = $('<td><span class="sat">' + i + "</td>");
				$currentTR = $("<tr></tr>");
				$("#calendar-body tr:last").after($currentTR);
			} else {
				// weekday
				$td = $("<td>" + i + "</td>");
			}
			day++;
			$currentTR.append($td);
			if (
				today.getFullYear() == date.getFullYear() &&
				today.getMonth() == date.getMonth() &&
				i == date.getDate()
			) {
				$td.addClass("today");
			}
		}
	}
})();
