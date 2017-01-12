export default class Heap {
	constructor(nodes, compareCb) {
		Object.assign(this, { nodes, compareCb });
		this.store = [];
		this.indexOf = {};
		this.ensureCb();
		if (nodes) nodes.forEach(node => {
			this.add(node);
		});
	}
	peek(){
		return this.store[0];
	}
	pop(){
		const last = this.store.length-1;
		this.swap(0, last);
		let [result] = this.store.splice(last, 1)
		this.heapifyDown(0);
		return result;
	}
	find(node){
		return this.store.indexOf(node);
	}
	add(node){
		this.store.push(node);
		this.heapifyUp(this.store.length-1);
		return node;
	}

	// should be private
	ensureCb(){
		if (!this.compareCb) this.compareCb = (a,b) => {
			switch (true) {
				case (a < b): 
					return -1;
				case (a === b): 
					return 0;
				case (a > b):
					return 1;
			}
		}
	}
	parent(idx) {
		return Math.floor((idx - 1) / 2)
	}
	children(idx) {
		return [2 * idx + 1, 2 * idx + 2]
	}
	heapifyUp(idx){
		if (idx == 0) return;
		const par = this.parent(idx);

		if (this.compare(idx, par) < 0) {
			this.swap(idx, par);
			this.heapifyUp(par);
		}
	}
	heapifyDown(idx){
		const [i,j] = this.children(idx);
		const min = this.compare(i,j) < 0 ? i : j;
		if (this.compare(idx, min) > 0) {
			this.swap(idx, min);
			this.heapifyDown(min);
		}
	}
	compare(i,j){
		return this.compareCb(this.store[i], this.store[j]);
	}
	swap(i, j) {
		const temp = this.store[i];
		this.store[i] = this.store[j]
		this.store[j] = temp;
	}
}