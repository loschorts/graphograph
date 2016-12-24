import { randCoord } from './util.js'

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

export class Line {
	constructor(view, color, vertices){
		Object.assign(this, {color, vertices})
		const material = new THREE.LineBasicMaterial({
			color,
			opacity: .5
		});

		const v3s = vertices.map(v => new THREE.Vector3(...v))

		const geometry = new THREE.Geometry();
		geometry.vertices.push(...v3s);

		window.xline = new THREE.Line(geometry, material);

		view.scene.add(xline);
		
	}
}

export class ParticleField {
	constructor(view, positions) {

		const particleCount = positions.length,
    particles = new THREE.Geometry(),
    pMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 20,
      map: THREE.ImageUtils.loadTexture(
		    "images/particle.png"
		  ),
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    THREE.TextureLoader, ("images/particle.png",(e) => {
    	pMaterial.map = event.content;
    })

		let particle, pos;
		
		positions.forEach( position => {
		  particles.vertices.push(new THREE.Vector3(...position));
		})

		var particleSystem = new THREE.Points(
		    particles,
		    pMaterial);

		// particleSystem.sortParticles = true;

		// add it to the scene
		view.scene.add(particleSystem);
	}

}