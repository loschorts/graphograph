export default class View {
	constructor(options) {
		Object.assign(this, options);

		this.objects = [];
		this.lights = [];

		this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2();

		this.renderer = new THREE.WebGLRenderer();
		const { viewAngle, aspect, near, far, zoom } = options.camera
		this.camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
		this.camera.position.z = 1000;
		this.zoom(zoom);
		this.scene = new THREE.Scene();
		this.scene.add(this.camera);
		this.renderer.setSize(this.width, this.height);
		this.resize = this.resize.bind(this);
		this.container.appendChild(this.renderer.domElement);
		this.setControls();
		this.setLighting();
		this.attachListeners();

	}

	attachListeners() {
		window.addEventListener('resize', this.resize.bind(this), false);
		window.addEventListener( 'dblclick', this.raycast.bind(this), false );
		window.addEventListener( 'click', this.raycast.bind(this), false );
	}

	setLighting(){
		this.addLight(0xFFC300, {x: 0, y:10000, z: 0})
		this.addLight(0x787877, {x: 0, y:-10000, z:0})
		this.addLight(0xECE81B, {x: -10000, y: 0, z: 0})
		this.addLight(0xFF5733, {x: 10000, y: 0, z: 0})
		this.addLight(0xDAF7A6, {x: 0, y: 0, z: 10000})
		this.addLight(0x900C3F, {x: 0, y: 0, z: -10000})
	}

	setControls(){
		this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
		this.controls.enableDamping = true;
		this.controls.dampingFactor = 0.25;
		this.controls.enableZoom = true;
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

	raycast(e) {
		this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
		this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

		this.raycaster.setFromCamera( this.mouse, this.camera );
		const intersects = this.raycaster.intersectObjects( this.scene.children );
		
		if (intersects.length > 0) this.uxcbs[e.type](intersects[0]);
	}


	render(){
		this.renderer.render(this.scene, this.camera);
	}

	animate(){
		this.controls.update();

		this.objects.forEach( object => {
			object.mesh.rotation.x += 0.01;
	    object.mesh.rotation.y += 0.02;
		})

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

export class Sphere {
	constructor(view, options) {
		options = Object.assign({
			radius: 50,
			segments: 16,
			rings: 16,
			position: {x:0, y: 0, z: 0},
			color: 0xCCFFFF
		}, options)
		const {radius, segments, rings, position, color} = options;
		Object.assign(this, { view, radius, segments, rings, position });
		this.geometry = new THREE.SphereGeometry(radius, segments, rings);
		this.material = new THREE.MeshLambertMaterial({ color });
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		Object.assign(this.mesh.position, position);
		this.view.scene.add(this.mesh);
	}
}

export class Cube {
	constructor(view, options) {
		options = Object.assign({
			length: 50, 
			position: {x:0, y:0, z:0}, 
			color: 0xFFFFFF
		}, options)

		const {length, position, color} = options
		Object.assign(this, {view}, options);
		this.geometry = new THREE.BoxBufferGeometry( length, length, length );
		this.material = new THREE.MeshLambertMaterial({ color })
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		Object.assign(this.mesh.position, position);
		this.view.scene.add(this.mesh);
	}
}

export class Light {
	constructor(view, color, position){
		Object.assign(this, {view});
		this.light = new THREE.PointLight(color)
		Object.assign(this.light.position, position);
		this.view.scene.add(this.light);
	}
}

export class ParticleField {
	constructor(view) {

		const particleCount = 1800,
    particles = new THREE.Geometry(),
    pMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 20
    });

		// now create the individual particles
		let particle, pos;
		for (let p = 0; p < particleCount; p++) {

		  // create a particle with random
		  // position values, -250 -> 250
		  pos = randCoord(500);
      particle = new THREE.Vector3(...pos);

		  // add it to the geometry
		  particles.vertices.push(particle);
		}

		// create the particle system
		var particleSystem = new THREE.Points(
		    particles,
		    pMaterial);

		// add it to the scene
		view.scene.add(particleSystem);
	}
}

function randCoord(range) {
	return [
		2 * range * Math.random() - range,
		2 * range * Math.random() - range,
		2 * range * Math.random() - range,
	];
}


