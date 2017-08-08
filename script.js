$(document).ready(function() {

	// $("body").click(function() {
	//     $("#info").css("left", "20px");
	//     $("#info").css("top", "20px");
	//     $("#info").css("display", "inline");
	//     $("#container").css("font-size", "40px");
	//     $("#container").css("left", "20px");
	//     $("#container").css("top", "90px");
	// });

	$("#splashContainer").click(function() {
		$("#splashContainer").css("display", "none");
		$("body").removeClass("splash-body");
	});

	mobileListeners();

	$(document).on("scroll", function() {
		$(".vid").each(function() {
			if (!isInView(this) && !this.paused) {
				this.pause();

				$(this).next(".description").removeClass("visible");
				$(this).next(".description").addClass("hidden");
			}
	  	});
	});

	//This has to run at load time so the browser can figure out what the current viewport size is.
	var isDesktopVersion = mediaQuery();

	//numberOfMatches is important, otherwise a new version of animate() gets called every time the viewport is above 992 pixels.
	var numberOfMatches;

	// if (isDesktopVersion) {
	// 	numberOfMatches = 1;
	// } else {
	// 	numberOfMatches = 0;
	// }
	(isDesktopVersion) ? numberOfMatches = 1 : numberOfMatches = 0;

	toAnimateOrNot(isDesktopVersion, numberOfMatches);

	$(window).resize(function() {
		isDesktopVersion = mediaQuery();
		// console.log(numberOfMatches);
		// console.log(isDesktopVersion);
		// var isDesktopVersion = mediaQuery();
		(isDesktopVersion) ? numberOfMatches++ : numberOfMatches = 0;

		toAnimateOrNot(isDesktopVersion, numberOfMatches);
	});

});

// Used for the mobile version - helps check to see if the video element is still on the screen.
function isInView(el) {
	var rect = el.getBoundingClientRect(); // absolute position of video element
	return !(rect.top > $(window).height() || rect.bottom < 0); // visible?
}

function makeNewPosition($container, el) {
    // Get viewport dimensions (remove the dimension of the div)

	var h = $container.height()/1.5 - el.height();
    var w = $container.width() - el.width();

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh, nw];
}

function animateDiv($target) {
    var newq = makeNewPosition($target.parent(), $target);
    var oldq = $target.offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);
	var isDesktopVersion = mediaQuery();

		console.log($target);
	if (isDesktopVersion) {
		$target.animate({
	        top: newq[0],
	        left: newq[1]
	    }, speed, function() {
	        animateDiv($target);
	    });
	}
};

function calcSpeed(prev, next) {
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);

    var greatest = x > y ? x : y;

    var speedModifier = 0.065;

    var speed = Math.ceil(greatest / speedModifier);

    return speed;
}

function mediaQuery() {
	return window.matchMedia('(min-width: 992px)').matches;
}

function mobileListeners() {
	$(".responsive-media").click(function() {
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
}

function desktopListeners() {
	// console.log("lul");
	// console.log(numberOfMatches);

	// Removes the click event listener from all of the projects, so there's no conflict with the new hover listener
	$(".responsive-media").off();
	// console.log('desktoplisters()')
	$(".responsive-media").each(function() {
		$(this).mouseenter(function() {
			$(this).addClass("full-width-project");
			// console.log($(this).hasClass("vid"));
			if ($(this).hasClass("vid")) {
				// console.log("testing");
				this.play();
			}

			$(this).parent().addClass("center-hover");

			// $(this).parent().removeClass("floating-projects");
			// $(this).parent().stop();
			// $(this).removeClass("");

			$(this).next(".description").removeClass("hidden");
			$(this).next(".description").addClass("visible");

		});

		$(this).mouseleave(function() {
			$(this).removeClass("full-width-project");

			if ($(this).hasClass("vid")) {
				// console.log("testing");
				this.pause();
			}

			// $(this).parent().addClass("floating-projects");
			// $(this).addClass("");
			$(this).parent().removeClass("center-hover");

			$(this).next(".description").removeClass("visible");
			$(this).next(".description").addClass("hidden");

		});
	});
}

function toAnimateOrNot(isDesktopVersion, numberOfMatches) {
	if (isDesktopVersion && numberOfMatches === 1) {
		console.log("hellooo");
		$("#container").addClass("fixed-container");
		var theTimeout = setTimeout(function() {

		$(".project-container").addClass("floating-projects");


		animateDiv($('#a'));
		animateDiv($('#b'));
		animateDiv($('#c'));
		animateDiv($('#d'));
		animateDiv($('#e'));
		animateDiv($('#f'));
		animateDiv($('#g'));
		animateDiv($('#h'));
		animateDiv($('#i'));
		animateDiv($('#j'));
		animateDiv($('#k'));
		animateDiv($('#l'));

		desktopListeners();
	  }, 1000);
	}

  if (!isDesktopVersion) {
	//   numberOfMatches = 0;
	  clearTimeout(theTimeout);

	  console.log("officially not a desktop version");
	  $("#container").removeClass("fixed-container");

	  $(".responsive-media").off();

	  $(".project-container").stop(true, true);
	  $(".project-container").removeClass("floating-projects");

	  $(".project-container").css("top", "0");
	  $(".project-container").css("left", "0");

	  mobileListeners();
  }
}
