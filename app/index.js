import WikiMap from './wikimap.js';
import Detector from '../lib/detector.js';
import View from './view.js';
import { ParticleField, Line } from './objects.js'
import { OrbitControlScheme } from './control_scheme.js'
import {randCoord} from './util.js'

import Heap from './heap.js';
window.Heap = Heap;

document.addEventListener("DOMContentLoaded", ()=> {

	// if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
	window.myWikiMap = new WikiMap();
	myWikiMap.explore("Donald Trump", () => {
		for (let x = 0; x < 1000; x++) {
			console.log(x);
			myWikiMap.expand();
		}
	});
	// window.myView = new View({
	// 	container: document.querySelector("#container"),
	// 	width: window.innerWidth,
	// 	height: window.innerHeight,
	// 	camera: {
	// 		viewAngle: 75,
	// 		aspect: window.innerWidth / window.innerHeight,
	// 		near: 1,
	// 		far: 10000,
	// 		zoom: .5
	// 	}
	// });

	// myView.controller = new OrbitControlScheme(myView, {
	// 	click: i => i.object.material.color.set(0x21EC1B),
	// 	dblclick: i => i.object.material.color.set(0xEC1BCF)
	// })

	// const positions = [];

	// const levels = {}

	// // levels[myWikiMap.nodes[0].value] = 0;

	// new ParticleField(myView, positions);

	// myView.animate();

});