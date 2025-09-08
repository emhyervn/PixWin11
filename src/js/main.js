"use strict";

// Show and hide copyright bar
const copyrightBtn = document.querySelector(".copyright-btn");
copyrightBtn.addEventListener("click", () => {
	let copyrightWindow = document.querySelector(".copyright");

	if (copyrightWindow.style.top === "0vh") {
		copyrightWindow.style.top = "-33vh";
	} else {
		copyrightWindow.style.top = "0vh";
	}
});

// binary rain background for copyright bar
document.addEventListener("DOMContentLoaded", () => {
	const canvas = document.getElementById("binaryRain");
	const ctx = canvas.getContext("2d");
	const fontSize = 10;
	const letters = "01";
	let drops = [];
	let resizeTimeout;

	function setupCanvas() {
		const parentWidth = canvas.parentElement.offsetWidth;
		const parentHeight = canvas.parentElement.offsetHeight;
		canvas.width = parentWidth;
		canvas.height = parentHeight;

		const columns = Math.floor(parentWidth / fontSize);
		drops = Array(columns).fill(1);
	}

	function draw() {
		ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = "#0F0";
		ctx.font = `${fontSize}px monospace`;

		for (let i = 0; i < drops.length; i++) {
			const text = letters[Math.floor(Math.random() * letters.length)];
			ctx.fillText(text, i * fontSize, drops[i] * fontSize);

			if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
				drops[i] = 0;
			}
			drops[i]++;
		}
	}

	// Initial setup
	setupCanvas();
	setInterval(draw, 25);

	// Debounce the resize event
	window.addEventListener("resize", () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(setupCanvas, 200);
	});
});
