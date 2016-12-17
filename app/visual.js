export class View {
	constructor(options) {
		Object.assign(this, options);
		this.renderer = new THREE.WebGLRenderer();
		const {viewAngle, aspect, near, far, zoom} = options.camera
		this.camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
		this.zoom(zoom);
		this.scene = new THREE.Scene();
		this.scene.add(this.camera);
		this.renderer.setSize(this.width, this.height);
		this.resize = this.resize.bind(this);
		this.container.appendChild(this.renderer.domElement);

		window.addEventListener('resize', this.resize, false);
	}

	render(){
		this.renderer.render(this.scene, this.camera);
	}

	animate(){
		this.render();
		window.requestAnimationFrame(()=>{
			this.animate();
		})
	}


	addTool(selector, cb, preventDefault = false){

		$(selector).on('input', e => {
			if (preventDefault) e.preventDefault();
			cb.call(this, e.currentTarget.value);
		});
	}

	zoom(level){
		console.log(level);
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

	onMove(e){
		if (this.cbs.onMove) this.cbs.onMove(e);
	}

	canClick(){
		let sameSpot = this.downPos[0] === this.upPos[0] && this.downPos[1] === this.upPos[1];
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

export class Sphere {
	constructor(view, radius = 50, segments = 16, rings = 16, 
		position = {x:0, y: 0, z:-300}, color = 0xFFFFFF) {

		Object.assign(this, { view, radius, segments, rings, position });
		this.sphereGeometry = new THREE.SphereGeometry(radius, segments, rings);
		this.material = new THREE.MeshLambertMaterial({ color });
		this.mesh = new THREE.Mesh(this.sphereGeometry, this.material);
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