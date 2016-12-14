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
			this.add(page);
			this.explore(page);
		}
	}
}