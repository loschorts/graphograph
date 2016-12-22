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
		window.addEventListener('resize', this.resize.bind(this), false);
		window.addEventListener( 'mousemove', this.onMouseMove.bind(this), false );

	}

	onMouseMove( event ) {

		// calculate mouse position in normalized device coordinates
		// (-1 to +1) for both components
		this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

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
		let x;
		switch (type) {
			case 'cube': 
			this.objects.push(x = new Cube(this, options))
			break;
			case 'sphere':
			this.objects.push(x = new Sphere(this, options))
			break;
		}

		return this.objects[this.objects.length-1];
	}

	addLight(color, position){
		this.lights.push(new Light(this, color, position));
	}


	render(){
		this.raycaster.setFromCamera( this.mouse, this.camera );
		// calculate objects intersecting the picking ray
		const intersects = this.raycaster.intersectObjects( this.scene.children );

		intersects.forEach(intersect => {
			intersect.object.material.color.set(0x21EC1B);
		});

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