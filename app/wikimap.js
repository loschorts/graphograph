import { Graph, Node, Edge } from './graph.js'
import { fetchInfo } from './util.js'

export default class WikiMap extends Graph {

	constructor() {
		super();
		this.explore = this.explore.bind(this);
		this.exploreQueue = [];
		this.enqueued = new Set();
		this.explored = new Set();
	}

	explore(page, cb) {
		if (this.explored.has(page)) return;
		const pageNode = this.getNode(page) || this.addPage(page);
		fetchInfo(page, links => {
			links.forEach( link => {
				const linkNode = this.getNode(link) || this.addPage(link);
				this.connect(pageNode, linkNode);
			});
			if (cb) cb();
		})
		this.explored.add(page);
		return page;
	}

	// sort(root) {
	// 	const distances = {};
	// 	const layers = [[root]];
	// 	const rootNode = this.getNode(root);
	// 	const seen = new Set();
	// 	const queue = [];

	// 	Array.from(rootNode.children()).forEach(node => {
	// 		distances[node.value] = 1;
	// 		queue.push(node.value);
	// 		seen.add(node.value);
	// 	});

	// 	while (queue.length > 0) {
	// 		let current = queue.shift();
	// 		if (!layers[distances[current]]) layers[distances[current]] = [];
	// 		layers[distances[current]].push(current.value);
	// 		this.getNode(current).children().forEach(child => {
	// 			if (!seen.has(child.value)) {
	// 				distances[child.value] = distances[current] + 1;
	// 				queue.push(child.value);
	// 				seen.add(child.value);
	// 			}
	// 		});
	// 	}

	// 	return layers;
	// }

	addPage(page){
		if (this.getNode(page)) return;
		if (!this.enqueued.has(page)) {
			this.exploreQueue.push(page);
			this.enqueued.add(page);
		}
		return this.addNodeByVal(page);
	}

}