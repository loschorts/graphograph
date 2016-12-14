"use strict";

class Node {
	constructor(value){
		this.value = value;
		this.childEdges = new Set();
		this.parentEdges = new Set();

	}

	destroy() {
		this.childEdges.forEach(edge => {
			edge.destroy();
		})
		this.parentEdges.forEach(edge => {
			edge.destroy();
		})
	}

}

class Edge {
	constructor(parent, child, weight) {
		this.parent = parent;
		this.child = child;
		this.weight = weight;

		this.parent.childEdges.add(this);
		this.child.parentEdges.add(this);
	}

	destroy() {
		this.parent.childEdges.delete(this);
		this.child.parentEdges.delete(this);
	}
}

class Graph {
	constructor(){
		this.nodes = {};
		this.edges = {};
		this.connect = this.connect.bind(this);
	}

	add(nodeVal){
		this.nodes[nodeVal] = new Node(nodeVal);
		return this.nodes;
	}

	getNode(nodeVal){
		return this.nodes[nodeVal];
	}

	connect(a, b) {
		this.nodes[a.value] = a;
		this.nodes[b.value] = b;
		this.edges[a,b] = new Edge(a, b);
	}

	*bfs(queue) {
		let enqueued = new Set(queue);
		let current;
		while (queue.length > 0) {
			current = queue.shift()
			yield current;
			current.childEdges.forEach(edge => {
				if (!enqueued.has(edge.child)) {
					queue.push(edge.child);
					enqueued.add(edge.child);
				}
			});
		}
	}

	*dfs(start, explored = new Set()) {
		if ( !explored.has(start) ) {
			yield start;
			explored.add(start);

			let next;

			const a = Array.from(start.childEdges);
			for (let i in a) {
				yield *this.dfs(a[i].child, explored);
			}
		}
	}	

}

