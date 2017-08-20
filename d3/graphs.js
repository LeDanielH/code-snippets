const d3Graphs = {
	vars() {
		this.graphWrapper = d3.select('.kf__graphs');
		this.allgraphs = document.querySelectorAll('.kf__graph');
		this.graph1 = this.graphWrapper.select('#kf__graph-1');
		this.yMax = 400;
		this.margin = {top: 7, right: 10, bottom: 12, left: 22};
		this.graphWidth = this.graph1.node().getBoundingClientRect().width - this.margin.left - this.margin.right;
		this.graphHeight = this.graph1.node().getBoundingClientRect().height - this.margin.top - this.margin.bottom;
	},
	makeGraphs(graphs) {
		for (let i = 1; i < graphs.length + 1; i++) {
			const graph = this.graphWrapper.select(`#kf__graph-${i}`);
			const graphDataElement = document.querySelector(`.kf__data-${i}`);
			const isEmpty = graphDataElement.innerHTML === '';
			if(isEmpty) break;
			const graphData = JSON.parse(graphDataElement.textContent);
			const svg = graph
				.append('svg')
				.attr('width', this.graphWidth + this.margin.left + this.margin.right)
				.attr('height', this.graphHeight  + this.margin.top + this.margin.bottom)
				.call(responsivefy)
				.append('g')
				.attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

			/* CREATE Y AXIS */
			const yScale = d3.scaleLinear()
				.domain([0, this.yMax])
				.range([this.graphHeight, 0])
				.clamp(true);

			/* APPEND Y AXIS */
			const yAxis = d3.axisLeft(yScale).ticks(5).tickSize(-this.graphWidth); // se documentation for more info
			svg.call(yAxis);

			/* CREATE X AXIS */
			const xScale = d3.scaleBand()
				.padding(0.4)
				.domain(graphData.map(d => d.Week))
				.range([0, this.graphWidth]);

			const xAxis = d3.axisBottom(xScale).tickSize(0);

			/* APPEND X AXIS */
			svg
				.append('g')
				.attr('transform', `translate(0, ${this.graphHeight})`)
				.call(xAxis);

			/* APPEND BARS */
			const bar = svg
				.selectAll('rect')
				.data(graphData)
				.enter()
				.append('g')
				.attr('width', d => xScale.bandwidth())
				.attr('height', d => this.graphHeight - yScale(d.Percentage));

			bar.append('rect')
				.attr('x', d => xScale(d.Week))
				.attr('y', d => yScale(d.Percentage))
				.attr('width', d => xScale.bandwidth())
				.attr('height', d => this.graphHeight - yScale(d.Percentage));
			/* could not figure out how to do this properly - positioning issues */

			// bar.append('text')
			// 	.attr('x', d => xScale(d.Week))
			// 	.text(function(d) {
			// 		if (d.Percentage > yMax) {
			// 			return d.Percentage;
			// 		}
			// 	})
		}
	},
	init() {
		this.vars();
		this.makeGraphs(this.allgraphs);
	}
};

d3Graphs.init();




