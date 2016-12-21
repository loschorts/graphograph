export class View {
	constructor(options) {
		Object.assign(this, options);
		this.renderer = new THREE.WebGLRenderer();
		const {viewAngle, aspect, near, far, zoom} = options.camera
		this.camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
		this.camera.position.z = 1000;
		// this.zoom(zoom);
		this.scene = new THREE.Scene();
		this.scene.add(this.camera);
		this.renderer.setSize(this.width, this.height);
		this.resize = this.resize.bind(this);
		this.container.appendChild(this.renderer.domElement);
		this.setControls();
		this.shapes = [];
		window.addEventListener('resize', this.resize, false);
	}

	setControls(){
		this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
		this.controls.enableDamping = true;
		this.controls.dampingFactor = 0.25;
		this.controls.enableZoom = false;
	}

	render(){
		this.renderer.render(this.scene, this.camera);
	}

	animate(){
		this.controls.update();

		// this.shapes.forEach( shape => {
		// 	shape.mesh.rotation.x += 0.01;
	 //    shape.mesh.rotation.y += 0.02;
		// })

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

export class UI {
	constructor(view, cbs = {}) {
		Object.assign(this, {view, cbs});
		this.domElement = this.view.renderer.domElement
		this.mouseDown = false;
		this.attachListeners();
	}

	onClick(e){
		if (this.cbs.onClick && this.canClick()) this.cbs.onClick(e);
	}

	onDrag(e){
		if (this.mouseDown && this.cbs.onDrag) {
			this.cbs.onDrag(e);
		}
	}

	slider(selector, options, cb){

		const $slider = $(selector);
		const { value, min, max, step } = options;

		$slider.prop('min', min);
		$slider.prop('max', max);
		// TODO: setting value doesn't work
		// $slider.prop('value', value);
		$slider.prop('step', step);

		$(selector).on('input', e => {
			cb(e.currentTarget.value);
		});
	}

	onMove(e){
		if (this.cbs.onMove) this.cbs.onMove(e);
	}

	canClick(){
		const [dx, dy] = this.downPos;
		const [ux, uy] = this.upPos;
		let sameSpot = dx === ux && dy === uy;
		this.downPos = this.upPos = undefined;
		return sameSpot;
	}

	attachListeners() {
		$(this.domElement).mousedown((e) => {
			this.mouseDown = true
			this.downPos = [e.clientX, e.clientY]
		});
		$(this.domElement).mouseup((e) => {
			this.mouseDown = false
			this.upPos = [e.clientX, e.clientY]
		});
		$(this.domElement).click(this.onClick.bind(this));
		$(this.domElement).mousemove(this.onDrag.bind(this));
		$(this.domElement).mousemove(this.onMove.bind(this));
	}
}