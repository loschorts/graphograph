import WikiMap from './wikimap.js';
import { View, Sphere, Light } from './visual.js';

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
		},
		container: document.querySelector("#container")
	})

	window.mySphere = new Sphere(myView);
	window.myLight = new Light(myView, 0xFFFFFF, {x: 10, y:50, z: 130})

	myView.animate();

});