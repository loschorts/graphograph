const parse = {
	links: (data) => {
		let result = {};
		data.forEach( res => {
			Object.keys(res.query.pages).forEach(id => {
				res.query.pages[id].links.forEach( link => {
					if (typeof result[id] === 'undefined') result[id] = new Set();
					result[id].add(link.title);
				})
			})
		})
		return window.result = result;
	}
}

function fetchInfo (titles, prop, cb, data = [], plcontinue) {
	$.ajax({
		url: "https://en.wikipedia.org/w/api.php",
		data: {
			action: "query", titles, prop, plcontinue, pllimit: 500, format: "json"
		},
		dataType: "jsonp",
		success: function(res){
			data.push(res);
			if (res.batchcomplete === "") {
				cb(parse[prop](data));
			} else {
				fetchInfo(titles, prop, cb, data, res.continue.plcontinue)
			}
		}
	})
}

