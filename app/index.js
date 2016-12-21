import WikiMap from './wikimap.js';
import View from './view.js';
import Detector from '../lib/detector.js';

document.addEventListener("DOMContentLoaded", ()=> {

	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	window.myWikiMap = new WikiMap();
	myWikiMap.addPage("World War II");
	window.myExpandGen = myWikiMap.expand();
	myExpandGen.next();

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


	myView.addLight(0xFFC300, {x: 0, y:10000, z: 0})
	myView.addLight(0x787877, {x: 0, y:-10000, z:0})
	myView.addLight(0xECE81B, {x: -10000, y: 0, z: 0})
	myView.addLight(0xFF5733, {x: 10000, y: 0, z: 0})
	myView.addLight(0xDAF7A6, {x: 0, y: 0, z: 10000})
	myView.addLight(0x900C3F, {x: 0, y: 0, z: -10000})

	myView.animate();

});

function mapNodes(wikiMap, view){
	let x,y,z;
	Object.keys(wikiMap.nodes).forEach(key => {
		[x,y,z] = [2000 * Math.random() - 1000, 2000 * Math.random() - 1000, 2000 * Math.random() - 1000];
		view.addObject('cube', {position: {x,y,z}});

	})
}

window.mapNodes = mapNodes;