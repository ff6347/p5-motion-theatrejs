/// <reference path="./node_modules/@types/p5/lib/addons/p5.sound.d.ts" />
/// <reference path="./node_modules/@types/p5/global.d.ts" />
/// <reference path="./node_modules/@types/p5/literals.d.ts" />
/// <reference path="./node_modules/@types/p5/constants.d.ts" />
// @ts-check
// Keep these comments above alive. They will help you while writing code.

// Using p5.js with Theatre.js
// based on https://www.theatrejs.com/docs/0.5/getting-started/with-html-svg

import p5 from "p5";
import { types, getProject } from "@theatre/core";
import projectState from "./project-state.json";

document.addEventListener("DOMContentLoaded", (event) => {
	let x = 10;
	let y = 10;
	let w = 10;
	let h = 10;
	/**
	 * Initializes and sets up the sketch.
	 *
	 * @param {p5} p - The p5 instance.
	 * @return {undefined} This function does not return a value.
	 */
	const sketch = (p) => {
		p.setup = function setup() {
			// setup runs once
			const canvas = p.createCanvas(100, 100);
			canvas.parent("sketch");
			p.background(128);
		};
		p.draw = function draw() {
			p.background(128);
			p.ellipse(x, y, w, h);
			// draw runs all the time
		};
	};
	console.log("DOM fully loaded and parsed");
	const div = document.getElementById("sketch");
	if (!div) throw new Error("div#sketch not found");
	new p5(sketch, div);
	const project = getProject("p5.js x Theatre.js", { state: projectState });
	const sheet = project.sheet("Animated scene");
	const obj = sheet.object("obj", {
		y: types.number(10, { range: [0, 100] }),
		x: types.number(10, { range: [0, 100] }),
		width: 10,
		height: 10,
	});
	obj.onValuesChange((obj) => {
		x = obj.x;
		y = obj.y;
	});

	project.ready.then(() => {
		sheet.sequence.play({ iterationCount: Infinity, range: [0, 5] });
	});
});
