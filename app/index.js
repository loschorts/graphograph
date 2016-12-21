import WikiMap from './wikimap.js';
import { View, Sphere, Cube, Light } from './visual.js';
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

	window.myCube = new Cube(myView,{position: {x:100, y: 0, z: 0}});
	window.mySphere = new Sphere(myView, {position: {x: -100, y:0, z:0}})
	window.topLight = new Light(myView, 0xFFFFFF, {x: 0, y:1000, z: 0})
	window.bottomLight = new Light(myView, 0x787877, {x: 0, y:-1000, z:0})
	myView.shapes.push(window.myShape, mySphere);
	myView.animate();

});