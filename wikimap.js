class WikiMap extends Graph {

	constructor() {
		super();
		this.explore = this.explore.bind(this);
		this.expand = this.expand.bind(this);
	}

	explore(page, cb) {
		const pageNode = this.getNode(page);
		const linkNodes = [];
		if (pageNode) {
			fetchInfo(page, (links) => {
				links.forEach(link => {
					const linkNode = new Node(link);
					linkNodes.push(linkNode);
					this.connect(pageNode, linkNode);
				});
				cb(linkNodes);
			});
		} else {
			this.addNodeByVal(page);
			this.explore(page);
		}
	}

	* expand(queue = Object.keys(this.nodes), enqueued = new Set(queue), current) {
		while (true) {
			if (queue.length > 0) {
				current = queue.shift()
				this.explore(current, linkNodes => {
					linkNodes.forEach(linkNode => {
						if (!enqueued.has(linkNode.value)) {
							queue.push(linkNode.value);
							enqueued.add(linkNode.value);
						}
					})
				})
			} 
			yield current;
		}
	}

	addPage(page){
		this.addNodeByVal(page);
	}

}

function sleep(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}		