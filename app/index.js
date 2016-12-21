import WikiMap from './wikimap.js';
import { View, Sphere, Cube, Light } from './view.js';
import Detector from '../lib/detector.js';

document.addEventListener("DOMContentLoaded", ()=> {

	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	window.myWikiMap = new WikiMap();
	myWikiMap.addPage("Table tennis");
	window.myExpandGen = myWikiMap.expand();

	window.myView = new View({
		width: window.innerWidth,
		height: window.innerHeight,
		camera: {
			viewAngle: 75,
			aspect: window.innerWidth / window.innerHeight,
			near: 1,
			far: 10000,
			zoom: .5
		},
		container: document.querySelector("#container")
	});

	// window.myUI = new UI(myView, {
	// 	onClick: () => console.log('clicked'),
	// 	onMove: () => console.log('move'),
	// 	onDrag: () => console.log('dragging')
	// });

	// myUI.slider("#zoom", {min: 0, max: 1, value: .5, step: .01}, myView.zoom.bind(myView));

	myView.addObject('cube', {position: {x: 100, y: 0, z: 0}});
	myView.addObject('sphere', {position: {x: -100, y:0, z:0}});

	myView.addLight(0xFFFFFF, {x: 0, y:1000, z: 0})
	myView.addLight(0x787877, {x: 0, y:-1000, z:0})
	myView.addLight(0xFFFFFF, {x: -1000, y: 0, z: 0})
	myView.addLight(0xFFFFFF, {x: 1000, y: 0, z: 0})
	myView.addLight(0xFFFFFF, {x: 0, y: 0, z: 1000})
	myView.addLight(0xFFFFFF, {x: 0, y: 0, z: -1000})

	myView.animate();

});