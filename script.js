$(document).ready(function() {

	// $("body").click(function() {
	//     $("#info").css("left", "20px");
	//     $("#info").css("top", "20px");
	//     $("#info").css("display", "inline");
	//     $("#container").css("font-size", "40px");
	//     $("#container").css("left", "20px");
	//     $("#container").css("top", "90px");
	// });

	$(".img").click(function() {
		if ($(this).next(".description").hasClass("hidden")) {
			$(this).next(".description").removeClass("hidden");
			$(this).next(".description").addClass("visible");
		} else {
			$(this).next(".description").removeClass("visible");
			$(this).next(".description").addClass("hidden");
		}
	})

	$(".vid").click(function() {
		if (this.paused) {
			this.play();
		} else {
			this.pause();
		}
	});

	$(document).on("scroll", function() {
		$( "video" ).each(function() {
			if (!isInView($(this)[0]) && !$(this)[0].paused) {
				$(this)[0].pause();
			}
	  });
	});

	// $('.vid').hover(function toggleControls() {
	//     if (this.hasAttribute("controls")) {
	//         this.removeAttribute("controls")
	//     } else {
	//         this.setAttribute("controls", "controls")
	//     }
	// })
});

function isInView(el) {
	var rect = el.getBoundingClientRect(); // absolute position of video element
	return !(rect.top > $(window).height() || rect.bottom < 0); // visible?
}
