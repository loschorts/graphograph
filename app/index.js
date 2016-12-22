import WikiMap from './wikimap.js';
import View from './view.js';
import Detector from '../lib/detector.js';

document.addEventListener("DOMContentLoaded", ()=> {

	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	window.myWikiMap = new WikiMap();
	myWikiMap.addPage("Wikipedia");
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