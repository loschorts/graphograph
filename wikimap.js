class WikiMap extends Graph {

	explore(page) {
		const pageNode = this.getNode(page);
		if (pageNode) {
			fetchInfo(page, (links) => {
				links.forEach(link => {
					this.connect(pageNode, new Node(link));
				});
			});
		} else {
			this.addPage(page);
			this.explore(page);
		}
	}

	addPage(page){
		return this.addNode(new Node(page));
	}

	getNode(page){
		return this.nodes[page];
	}
}