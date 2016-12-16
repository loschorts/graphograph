export class View {
	constructor(options) {
		Object.assign(this, options);
		this.renderer = new THREE.WebGLRenderer();
		const {viewAngle, aspect, near, far} = options.camera
		this.camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
		this.scene = new THREE.Scene();
		this.scene.add(this.camera);
		this.renderer.setSize(options.width, options.height);
		this.container.appendChild(this.renderer.domElement);
	}

	render(){
		this.renderer.render(this.scene, this.camera);
	}
}

export class Sphere {
	constructor(view, radius = 50, segments = 16, rings = 16, 
		position = {z:-300}, color = 0xFFFFFF) {

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