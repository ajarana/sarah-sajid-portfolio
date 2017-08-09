$(document).ready(function() {

	$("#splashContainer").click(function() {
		$("#splashContainer").css("display", "none");
		$("body").removeClass("splash-body");
	});

	mobileListeners();

	$(document).on("scroll", function() {
		$(".vid").each(function() {
			if (!isInView(this) && !this.paused) {
				this.pause();
			}
	  	});

		$(".responsive-media").each(function() {
			if (!isInView(this)) {
				$(this).next(".description").removeClass("visible");
				$(this).next(".description").addClass("hidden");
			}
	  	});
	});

	//This has to run at load time so the browser can figure out what the current viewport size is.
	var isDesktopVersion = mediaQuery();

	//numberOfMatches is important, otherwise a new version of animate() gets called every time the viewport is above 992 pixels.
	var numberOfMatches;

	(isDesktopVersion) ? numberOfMatches = 1 : numberOfMatches = 0;

	toAnimateOrNot(isDesktopVersion, numberOfMatches);

	$(window).resize(function() {
		isDesktopVersion = mediaQuery();

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

	var h = $container.height() - el.height();
    var w = $container.width() - el.width();

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
	console.log([nh, nw])
    return [nh, nw];
}

function animateDiv($target) {
    var newq = makeNewPosition($target.parent(), $target);
    var oldq = $target.offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);
	var isDesktopVersion = mediaQuery();

	if (isDesktopVersion) {
		// console.log("animateDiv was called recursively")
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
	// var speedModifier = 0.09;

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
	// Removes the click event listener from all of the projects, so there's no conflict with the new hover listener
	$(".project-container").off();
	$(".responsive-media").off();
	// console.log('desktoplisters()')

	if ($(this).next(".description").hasClass("hidden")) {
		$(this).next(".description").removeClass("hidden");
		$(this).next(".description").addClass("visible");
	} else {
		$(this).next(".description").removeClass("visible");
		$(this).next(".description").addClass("hidden");
	}

	$(".responsive-media").each(function() {
		var startingCoordinates = makeNewPosition($(this).parent().parent(), $(this).parent());

		$(this).parent().css("top", startingCoordinates[0]+"px");
		$(this).parent().css("left", startingCoordinates[1]+"px");

		$(this).mouseenter(function() {
			if ($(this).hasClass("vid")) {
				this.play();
			}

			$(this).parent().addClass("center-hover");

			// $(this).parent().removeClass("floating-projects");
			$(this).parent().stop();

			// var top = $(this).parent().parent().height()/2 - $(this).parent().height()/2 + 'px';
			// var left = $(this).parent().parent().width()/2 - $(this).parent().width()/2 + 'px';

			$(this).parent().css("left", "0");

			$(this).next(".description").removeClass("hidden");
			$(this).next(".description").addClass("visible");
		});

		$(this).parent().mouseleave(function() {
			if ($(this).children(".vid").length === 1) {
				// console.log("whoa");
				// console.log("testing");
				$(this).children(".vid")[0].pause();
			}

			// $(this).parent().addClass("floating-projects");

			$(this).removeClass("center-hover");

			animateDiv($(this));

			$(this).children(".responsive-media").next(".description").removeClass("visible");
			$(this).children(".responsive-media").next(".description").addClass("hidden");

		});
	});
}

function toAnimateOrNot(isDesktopVersion, numberOfMatches) {
	if (isDesktopVersion && numberOfMatches === 1) {
		// console.log("hellooo");
		$("#container").addClass("fixed-container");
		// var theTimeout = setTimeout(function() {

		$(".project-container").addClass("floating-projects");

		desktopListeners();

		animateDiv($('#a'));
		animateDiv($('#b'));
		animateDiv($('#c'));
		// animateDiv($('#d'));
		animateDiv($('#e'));
		// animateDiv($('#f'));
		animateDiv($('#g'));
		animateDiv($('#h'));
		animateDiv($('#i'));
		animateDiv($('#j'));
		animateDiv($('#k'));
		animateDiv($('#l'));

		// desktopListeners();
	//   }, 1000);
	}

  if (!isDesktopVersion) {
	//   clearTimeout(theTimeout);

	  $("#container").removeClass("fixed-container");

	  $(".project-container").off();
	  $(".responsive-media").off();

	  $(".project-container").stop(true, true);
	  $(".project-container").removeClass("floating-projects");

	  $(".project-container").css("top", "0");
	  $(".project-container").css("left", "0");

	  mobileListeners();
  }
}
