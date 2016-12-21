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