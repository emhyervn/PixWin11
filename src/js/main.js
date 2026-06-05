"use strict";
import {} from "../data/directory.js";

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

// Binary rain background for copyright bar
document.addEventListener("DOMContentLoaded", () => {
	const canvas = document.getElementById("binaryRain");
	const ctx = canvas.getContext("2d");
	let fontSize = Math.trunc(window.innerWidth / 170);
	const letters = "01";
	let drops = [];
	let resizeTimeout;

	function setupCanvas() {
		fontSize = Math.trunc(window.innerWidth / 170);

		if (window.innerWidth / window.innerHeight >= 2 && fontSize > 7) {
			fontSize -= 2;
		} else if (window.innerHeight >= window.innerWidth / 2) {
			fontSize += 2;
		}
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
	setInterval(draw, 20);

	// Debounce the resize event
	window.addEventListener("resize", () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(setupCanvas, 300);
	});
});

// fullscreen req
let fullscreenMode = false;
let fullscreenButton = document.getElementById("fullscreen-button");
const documentElement = document.documentElement; // The whole document

// Desktop grid
const desktop = document.querySelector(".desktop");
// desktop icons array
const desktopInfo = [
	"0|shortcut|shortcut-icon|shortcut-name|;../../assets/images/icons/controlPanelIcon.png;Control Panel",
	"1|shortcut|shortcut-icon|shortcut-name|;../../assets/images/icons/thisPCIcon.png;This PC",
	"2|desktop-item|shortcut-icon|shortcut-name|;../../assets/images/icons/recycleBinEmptyIcon.png;Recycle Bin",
	"3|desktop-item|shortcut-icon fullscreen-button|shortcut-name|;../../assets/images/icons/fullscreenIcon.png;Fullscreen",
];

function renderDesktopGrid() {
	desktop.style.gridTemplateColumns = `repeat(${Math.trunc(window.innerWidth / 100)}, 100px)`;
	desktop.style.gridTemplateRows = `repeat(${Math.trunc((window.innerHeight - ((window.innerHeight / 100) * 7 <= 40 ? 40 : (window.innerHeight / 100) * 7)) / 100)}, 100px)`;
	let divCount =
		Math.trunc(window.innerWidth / 100) *
		Math.trunc(
			(window.innerHeight -
				((window.innerHeight / 100) * 7 <= 40
					? 40
					: (window.innerHeight / 100) * 7)) /
				100,
		);

	for (let i = 0; i < divCount; i++) {
		const cell = document.createElement("div");
		cell.className = `cell-${i} grid-cell`;
		desktop.appendChild(cell);
	}
	window.addEventListener("resize", () => {
		desktop.innerHTML = "";
		divCount =
			Math.trunc(window.innerWidth / 100) *
			Math.trunc(
				(window.innerHeight -
					((window.innerHeight / 100) * 7 <= 40
						? 40
						: (window.innerHeight / 100) * 7)) /
					100,
			);
		desktop.style.gridTemplateColumns = `repeat(${Math.trunc(window.innerWidth / 100)}, 100px)`;
		desktop.style.gridTemplateRows = `repeat(${Math.trunc((window.innerHeight - ((window.innerHeight / 100) * 7 <= 40 ? 40 : (window.innerHeight / 100) * 7)) / 100)}, 100px)`;
		for (let i = 0; i < divCount; i++) {
			const cell = document.createElement("div");
			cell.className = `cell-${i} grid-cell`;
			desktop.appendChild(cell);
		}

		desktopInfo.forEach((infoString) => {
			const element = `<div class="${infoString.split("|")[1]}"><div class="img-wrapper"><img class="${infoString.split("|")[2]}" src="${infoString.split(";")[1]}"></div><p class="${infoString.split("|")[3]}">${infoString.split(";")[2]}</p></div>`;
			document.querySelector(
				`.cell-${infoString.split("|")[0]}`,
			).innerHTML = element;
		});

		fullscreenButton = document.querySelector(".fullscreen-button");
		fullscreenButton.addEventListener("click", () => {
			if (!fullscreenMode) {
				// If not in fullscreen mode, request fullscreen
				if (documentElement.requestFullscreen) {
					documentElement.requestFullscreen();
				} else if (documentElement.webkitRequestFullscreen) {
					/* Safari */
					documentElement.webkitRequestFullscreen();
				} else if (documentElement.msRequestFullscreen) {
					/* IE11 */
					documentElement.msRequestFullscreen();
				}
				fullscreenMode = true;
				desktopInfo.find((e) => {
					e.includes("Fullscreen");
					console.log(e);
				});
			} else {
				// If in fullscreen mode, exit fullscreen
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.webkitExitFullscreen) {
					/* Safari */
					document.webkitExitFullscreen();
				} else if (document.msExitFullscreen) {
					/* IE11 */
					document.msExitFullscreen();
				}
				fullscreenMode = false;
			}
		});
	});

	desktopInfo.forEach((infoString) => {
		const parts = infoString.split("|");
		const srcAndLabel = infoString.split(";");
		const fixedSrc = "/PixWin11/" + srcAndLabel[1].replace(/^\.\//, "");
		const element = `<div class="${parts[1]}"><div class="img-wrapper"><img class="${parts[2]}" src="${fixedSrc}"></div><p class="${parts[3]}">${srcAndLabel[2]}</p></div>`;
		document.querySelector(`.cell-${parts[0]}`).innerHTML = element;
	});
}
renderDesktopGrid();

fullscreenButton = document.querySelector(".fullscreen-button");
fullscreenButton.addEventListener("click", () => {
	if (!fullscreenMode) {
		// If not in fullscreen mode, request fullscreen
		if (documentElement.requestFullscreen) {
			documentElement.requestFullscreen();
		} else if (documentElement.webkitRequestFullscreen) {
			/* Safari */
			documentElement.webkitRequestFullscreen();
		} else if (documentElement.msRequestFullscreen) {
			/* IE11 */
			documentElement.msRequestFullscreen();
		}
		fullscreenMode = true;
	} else {
		// If in fullscreen mode, exit fullscreen
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			/* Safari */
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
			/* IE11 */
			document.msExitFullscreen();
		}
		fullscreenMode = false;
	}
});

// Taskbar
// Display time and date
const clockEl = document.querySelector(".clock");
const dateEl = document.querySelector(".date");

setInterval(() => {
	const now = new Date();
	clockEl.textContent = `${now.getHours() >= 10 ? now.getHours() : `0${now.getHours()}`}:${now.getMinutes() >= 10 ? now.getMinutes() : `0${now.getMinutes()}`}:${now.getSeconds() >= 10 ? now.getSeconds() : `0${now.getSeconds()}`}`;
	dateEl.textContent = `${now.getUTCFullYear()}/${now.getMonth() >= 10 ? now.getMonth() : `0${now.getMonth()}`}/${now.getDay() >= 10 ? now.getDay() : `0${now.getDay()}`}`;
}, 1000);
// Language icon change
const langHTML = document.querySelector(".lang");
langHTML.addEventListener("click", () => {
	langHTML.textContent === "ENG"
		? (langHTML.textContent = "FA")
		: (langHTML.textContent = "ENG");
});

// volume change functionality
const volumeBtn = document.querySelector(".volume");
volumeBtn.addEventListener("click", () => {
	const volumeIcon = document.querySelector(".volume-icon");
	const volumeSrc =
		volumeIcon.src.split("/")[volumeIcon.src.split("/").length - 1];

	volumeSrc === "volumeOffIcon.png"
		? (volumeIcon.src = "./assets/images/icons/volumeMuteIcon.png")
		: (volumeIcon.src = "./assets/images/icons/volumeOffIcon.png");
});
