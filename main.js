function go() {

	let x = new WikiMap();
	x.addPage("World War II");

	let queue = [x.getNode("World War II")];
	let enqueued = new Set();

	let gen = x.bfs(queue)

	buildGraph(gen, queue, enqueued);

	function buildGraph(gen, queue = [], enqueued = new Set(queue), calls = 0) {
		console.log(queue);
		let res = gen.next();
		if (res.done || Object.keys(x.nodes).length > 10) return;

		x.explore(res.value.value, node => {
			if (!enqueued.has(node)) {
				queue.push(node);
				enqueued.add(node);
			}
			console.log(calls++);
			buildGraph(gen, queue, enqueued, calls);
		})
	}
}

let x = new WikiMap();
x.addPage("Life");
let gen = x.expand()
