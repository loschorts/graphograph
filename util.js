function fetchInfo (titles, prop, cb) {
	const data = [];

	function fetchBatch (titles, prop, cb, plcontinue) {
		$.ajax({
			url: urlFor(titles, prop),
			data: {
				action: "query",
				titles,
				prop,
				plcontinue,
				pllimit: 500,
				format: "json"
			},
			dataType: "jsonp",
			success: function(res){
				data.push(res);
				debugger
				if (res.batchcomplete === "") {
					cb(data);
				} else {
					fetchBatch(titles, prop, cb, res.continue.plcontinue)
				}
			}
		})
	}

	fetchBatch(titles, prop, cb);
}


function urlFor(titles, prop) {
	return `https://en.wikipedia.org/w/api.php`
}