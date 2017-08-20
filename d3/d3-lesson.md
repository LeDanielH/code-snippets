
```javascript

	console.log(d3.version);

	/* LINEAR SCALE */
	const linearScale = d3.scaleLinear()
	.domain([0, 200])
	.range([0,1]) // converts domain between 0 and 1
	.clamp(true); // in case chart exeeds expected value - negative too

	console.log('LINEAR SCALE', linearScale(0));
	console.log('LINEAR SCALE', linearScale(80));

	/* QUANTIZE SCALE */
	const quantizeScale = d3.scaleQuantize()
	.domain([0, 100])
	//.range(["red","green"]) // everything below 50 will be red, everything above will be green
	.range(["red","blue", "green"]); // splits domain in 3


	console.log('QUANTIZE SCALE',quantizeScale(80));
	console.log('QUANTIZE SCALE',quantizeScale(13));
	console.log('QUANTIZE SCALE',quantizeScale(50));
	console.log('QUANTIZE SCALE',quantizeScale.invertExtent('blue')); // returns a range

	/* ORDINAL SCALE */
	const ordinalScale = d3.scaleOrdinal()
	.domain(["poor", "good", "great"])
	//.range(["red","green"]) // everything below 50 will be red, everything above will be green
	.range(["red","blue", "green"]); // splits domain in 3
	console.log('ORDINAL SCALE', ordinalScale('poor')); // its bind to index

	/* TIME SCALE */
	const timeScale = d3.scaleTime()
	.domain([new Date(2017, 0, 1), new Date()])
	.range([0, 100]);

	console.log('TIME SCALE', timeScale(new Date(2017, 2, 15)));
	console.log('TIME SCALE', timeScale.invert(50)); // shows us the date in the middle fuckin awesome

	/* SELECT GRAPHS */

	console.log(graphHeight);
	firstGraph // can also set attributes
	// .attr('data-graph', 1)
	// .style('background', 'red')
	// .style('color', 'white')
	// .classed('red', true)
	// .text('this is graph')

	/* NESTING CONVENTION */
	// .append('button')
	//.insert('button') // works the same as append but has a second argument before what element do I want to append it
	// 	.html('this is <strong>button</strong>')
	// .append('div')
	// 	.style('background', 'green');
	// can also remove elements

	// firstGraph.select('button').remove();

	// and return them
	/*console.log(firstGraph.attr('data-graph'));*/
	console.log(allGraphs.nodes());
	console.log(allGraphs.size());


	d3.json('Content/json/payments.json', (data) => { // d3.csv and d3.tsv works the same
	const min = d3.min(data, (d) => d.percent);
	const max = d3.max(data, (d) => d.percent);
	const minmax = d3.extent(data, (d) => d.percent);
	console.log(min, max, minmax);
	const scale = d3.scaleLinear()
	.domain(minmax)
	.range([0, graphHeight]); // can be pixels, now its height
	console.log(scale(140));
	/*
	RETURNS UNIQUE VALUES ONLY (NOT SAME NUMBERS)
	const percentages = d3.set(data, (d) => d.percent);
	console.log(percentages.values())
	*/
	});
```