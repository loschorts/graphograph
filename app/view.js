import { Sphere, Cube, Light, ParticleField } from './objects.js'

export default class View {
	constructor(options) {
		Object.assign(this, options);

		this.objects = [];
		this.lights = [];

		this.renderer = new THREE.WebGLRenderer();
		const { viewAngle, aspect, near, far, zoom } = options.camera
		this.camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
		this.camera.position.z = 10000;
		this.zoom(zoom);
		this.scene = new THREE.Scene();
		this.scene.add(this.camera);
		this.renderer.setSize(this.width, this.height);
		this.resize = this.resize.bind(this);
		this.container.appendChild(this.renderer.domElement);

		this.setLighting();
		window.addEventListener('resize', this.resize.bind(this), false);

	}

	setLighting(){
		this.addLight(0xFFC300, {x: 0, y:10000, z: 0})
		this.addLight(0x787877, {x: 0, y:-10000, z:0})
		this.addLight(0xECE81B, {x: -10000, y: 0, z: 0})
		this.addLight(0xFF5733, {x: 10000, y: 0, z: 0})
		this.addLight(0xDAF7A6, {x: 0, y: 0, z: 10000})
		this.addLight(0x900C3F, {x: 0, y: 0, z: -10000})
	}

	addObject(type, options){
		switch (type) {
			case 'cube': 
			this.objects.push(new Cube(this, options))
			break;
			case 'sphere':
			this.objects.push(new Sphere(this, options))
			break;
		}

		return this.objects[this.objects.length-1];
	}

	addLight(color, position){
		this.lights.push(new Light(this, color, position));
	}

	render(){
		if (this.controls) this.controls.getInput();
		this.renderer.render(this.scene, this.camera);
	}

	animate(){
		window.requestAnimationFrame(this.animate.bind(this));
		this.render();
	}

	zoom(level){
		this.camera.zoom = level;
		this.camera.updateProjectionMatrix();
	}

	move(x, y) {
		this.camera.updateProjectionMatrix();
	}

	resize(){
		let tanFOV = Math.tan( ( ( Math.PI / 180 ) * this.camera.fov / 2 ) );
  	this.camera.fov = ( 360 / Math.PI ) * Math.atan( tanFOV * ( window.innerHeight / this.height ) );

		[this.width, this.height] = [window.innerWidth, window.innerHeight];
		this.camera.aspect = this.width/this.height;
    this.camera.lookAt( this.scene.position );
		this.camera.updateProjectionMatrix();

		this.renderer.setSize(this.width, this.height);
	}

	randomParticles(){
		this.particles = new ParticleField(this);
	}
}
