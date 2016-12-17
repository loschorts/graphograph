import WikiMap from './wikimap.js';
import { View, Sphere, Light, UI } from './visual.js';

document.addEventListener("DOMContentLoaded", ()=> {

	window.myWikiMap = new WikiMap();
	myWikiMap.addPage("Table tennis");
	window.myExpandGen = myWikiMap.expand();

	window.myView = new View({
		width: window.innerWidth,
		height: window.innerHeight,
		camera: {
			viewAngle: 45,
			aspect: (window.innerWidth / window.innerHeight),
			near: .1,
			far: 10000,
			zoom: .5
		},
		container: document.querySelector("#container")
	})

	window.myUI = new UI(myView, {
		onClick: () => console.log('clicked'),
		onMove: () => console.log('move'),
		onDrag: () => console.log('dragging')
	});

	myUI.slider("#zoom", {min: 0, max: 1, value: .5, step: .01}, myView.zoom.bind(myView));

	window.mySphere = new Sphere(myView);
	window.myLight = new Light(myView, 0xFFFFFF, {x: 10, y:50, z: 130})

	myView.animate();


});