"use strict";

class Node {
	constructor(value){
		this.value = value;
		this.childEdges = new Set();
		this.parentEdges = new Set();

	}

	destroy() {
		this.childEdges.forEach(edge => {
			console.log(edge)
			edge.destroy();
		})
		this.parentEdges.forEach(edge => {
			console.log(edge)
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
	constructor(nodes){
		this.nodes = nodes;
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

