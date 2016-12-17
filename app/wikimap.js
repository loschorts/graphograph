import { Graph, Node, Edge } from './graph.js'
import { fetchInfo } from './util.js'

export default class WikiMap extends Graph {

	constructor() {
		super();
		this.explore = this.explore.bind(this);
		this.expand = this.expand.bind(this);
	}

	explore(page, cb) {
		const pageNode = this.getNode(page);
		const cbNodes = [];
		if (pageNode) {
			fetchInfo(page, (links) => {
				links.forEach(link => {
					let linkNode = this.getNode(link);
					if (!linkNode) linkNode = new Node(link);
					cbNodes.push(linkNode);
					this.connect(pageNode, linkNode);
				});
				if (cb) cb(cbNodes);
			});
		} else {
			this.addNodeByVal(page);
			this.explore(page);
		}
	}

	* expand() {
		let queue = Object.keys(this.nodes);
		let enqueued = new Set(queue);
		let served = new Set();
		let current;

		while (true) {
			if (queue.length > 0) {
				current = queue.shift()
				if (!served.has(current)) {
					this.explore(current, linkNodes => {
						linkNodes.forEach(linkNode => {
							if (!enqueued.has(linkNode.value)) {
								queue.push(linkNode.value);
								enqueued.add(linkNode.value);
							}
						})
					})
					served.add(current);
				}
			} else {
				current = 'NO_NEW_NODES';
			}
			yield current;
		}
	}

	addPage(page){
		this.addNodeByVal(page);
	}

}