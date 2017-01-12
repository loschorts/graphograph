export class Node {
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

	children() {
		return this.nodesFor(this.childEdges);
	}

	parents() {
		return this.nodesFor(this.parentEdges);
	}

	nodesFor(edges) {
		return Array.from(edges).map(edge => edge.child);
	}

}

export class Edge {
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

export class Graph {
	constructor(){
		this.nodes = {};
		this.connect = this.connect.bind(this);
		this.addNode = this.addNode.bind(this);
		this.addEdge = this.addEdge.bind(this);
	}

	addNode(node) {
		return this.nodes[node.value] = node;
	}

	addEdge(a, b) {
		new Edge(a, b);
	}

	addNodeByVal(val){
		return this.addNode(new Node(val));
	}

	getNode(val){
		return this.nodes[val];
	}

	getEdgeByNodes(a,b) {
		return this.edges[[a,b]]
	}

	connect(a, b) {
		this.addEdge(a,b);
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

