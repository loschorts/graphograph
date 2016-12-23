import WikiMap from './wikimap.js';
import Detector from '../lib/detector.js';
import View from './view.js';
import { ParticleField, Line } from './objects.js'
import { OrbitControlScheme } from './control_scheme.js'
import {randCoord} from './util.js'

document.addEventListener("DOMContentLoaded", ()=> {

	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	// window.myWikiMap = new WikiMap();
	// myWikiMap.addPage("Wikipedia");
	// window.myExpandGen = myWikiMap.expand();

	window.myView = new View({
		container: document.querySelector("#container"),
		width: window.innerWidth,
		height: window.innerHeight,
		camera: {
			viewAngle: 75,
			aspect: window.innerWidth / window.innerHeight,
			near: 1,
			far: 10000,
			zoom: .5
		}
	});

	myView.controller = new OrbitControlScheme(myView, {
		click: i => i.object.material.color.set(0x21EC1B),
		dblclick: i => i.object.material.color.set(0xEC1BCF)
	})

	window.myLine = new Line(myView, 0xFFFFFF, [
		[0,0,0],
		[1000,1000,1000]
	])

	// let x,y,z;
	// for ( let i = 0 ; i < 10000 ; i ++ ) {
	// 	[x,y,z] = randCoord(10000);
	// 	myView.addObject('cube', {
	// 		length: 20,
	// 		position: {x,y,z},
	// 		color: 0xFFFFFF
	// 	});
	// }

	new ParticleField(myView);

	myView.animate();

});