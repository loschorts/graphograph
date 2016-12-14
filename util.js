const parse = {
	links: (data) => {
		let result = new Set();
		data.forEach( res => {
			Object.keys(res.query.pages).forEach(id => {
				res.query.pages[id].links.forEach( link => {
					// non-zero ns values are meta-info, not entries, so exclude them
					if (link.ns === 0) result.add(link.title);
				})
			})
		})
		return result;
	}
}

function fetchInfo (titles, cb, prop = "links", data = [], plcontinue) {
	$.ajax({
		url: "https://en.wikipedia.org/w/api.php",
		data: {
			action: "query", titles, prop, plcontinue, pllimit: 500, format: "json"
		},
		dataType: "jsonp",
		success: function(res){
			data.push(res);
			// res will either have `batchcomplete` or `continue` key
			if (res.batchcomplete === "") { 
				cb(parse[prop](data));
			} else {
				fetchInfo(titles, cb, prop, data, res.continue.plcontinue)
			}
		}
	})
}

