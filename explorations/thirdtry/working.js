console.clear();

$(document).ready(function() {

	Splitting();

	let progress = 100;
	let active = false;
	let complete = false;
	const trigger = $('.trigger');
	const offScreen = $('.offscreen');
	const content = offScreen.find('.content');
	const closeBtn = offScreen.find('.close');

	trigger.on('mouseover', function() {
		active = true;
		start();
	});
	trigger.on('mouseout', function() {
		active = false;
		stop();
	});
	trigger.on('click', finish);

	// reset
	$(document).on('keydown', function(e) {
		let pKey = e.which;
		(pKey === 27) && reset();
	});

	closeBtn.on('click', reset);

	function reset() {
		active = false;
		complete = false;
		progress = 100;
		transition(100);
		offScreen.removeClass('open');
	}


	function start() {
		if (active && !complete) {
			if (progress <= 30) {
				progress = 0;
				complete = true;
				offScreen.addClass('open');
			} else {
				progress = progress - 1;
				setTimeout(start, 10);
			}
			console.log(`progress: ${progress}`);
			transition(progress);
		}
	}

	function stop() {
		if (!complete) {
			progress = 100;
			transition(100);
			offScreen.removeClass('open');
		}
	}

	function finish() {
		progress = 0;
		complete = true;
		transition(progress);
		offScreen.addClass('open');
	}

	function transition(progress) {
		TweenMax.to(offScreen, .6, {
			x: `${progress}vw`
		});
		TweenMax.to(content, .6, {
			x: `-${progress}vw`
		});
	}


	transition(0);
	setTimeout(function() {
		transition(100);
	}, 1000);
});
