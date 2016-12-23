class ControlScheme {
	constructor(view, handlers){
		Object.assign(this, {view, handlers });
		// this.enabled = true;
		this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2();

		this.attachListeners();
	}
	attachListeners(){
		window.addEventListener( 'dblclick', this.raycast.bind(this), false );
		window.addEventListener( 'click', this.raycast.bind(this), false );
	}

	raycast(e) {
		this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
		this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
		this.raycaster.setFromCamera( this.mouse, this.view.camera );
		const intersects = this.raycaster.intersectObjects( this.view.scene.children );

		if (intersects.length > 0) this.handlers[e.type](intersects[0]);
	}
}

export class OrbitControlScheme extends ControlScheme {
	constructor(view){
		super(view);
		this.controls = new THREE.OrbitControls(this.view.camera, this.view.renderer.domElement);
		this.controls.enableDamping = true;
		this.controls.dampingFactor = 0.25;
		this.controls.enableZoom = true;
	}
	getInput(){
		this.controls.update();
	}

}

export class PointerlockControlScheme extends ControlScheme {

}