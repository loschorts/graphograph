const parse = {
	links: (batches) => {
		let result = new Set();
		batches.forEach( batch => {
			Object.keys(batch.query.pages).forEach(id => {
				batch.query.pages[id].links.forEach( link => {
					// non-zero ns values are meta-info, not entries, so exclude them
					if (link.ns === 0) result.add(link.title);
				})
			})
		})
		return result;
	}
}

function fetchInfo (titles, cb, prop = "links", batches = [], plcontinue) {
	$.ajax({
		url: "https://en.wikipedia.org/w/api.php",
		data: {
			action: "query", titles, prop, plcontinue, pllimit: 500, format: "json"
		},
		dataType: "jsonp",
		success: function(batch){
			batches.push(batch);
			// res will either have `batchcomplete` or `continue` key
			if (batch.batchcomplete === "") { 
				cb(parse[prop](batches));
			} else {
				fetchInfo(titles, cb, prop, batches, batch.continue.plcontinue)
			}
		}
	})
}

