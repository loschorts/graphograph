let x = new WikiMap();
x.addPage("Table tennis");
let gen = x.expand()

document.addEventListener("DOMContentLoaded", ()=> {

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

	myView.render();

});