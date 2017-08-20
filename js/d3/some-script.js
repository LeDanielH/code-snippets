/* add tooltip plugin */ 
var myData = [ 10, 15, 20, 25, 30, 45, 50, 40, 45, 15 ,20];
 myData.sort(d3.descending); //default is ascending
 var body = d3.select("body");
 var svgHeight = 300;
 var svgWidth = 500;
 var spacing = 10;
 var differenceLevel = 5; // 1 makes no difference
 var dataMax = d3.max(myData);
 var dataMin = d3.min(myData);
 var tooltip = body.append('div').attr('id', 'tooltip').classed("hidden", true);

 var heightScale = d3.scale.linear()
   .domain([0, dataMax])
   .range([0, svgHeight]);

 var colorScale = d3.scale.linear()
   .domain([0, dataMax])
   .range(["blue", "red"]);

 var svg = body.append("svg")
   .attr({
     "width": svgWidth,
     "height": svgHeight,
     "style": "background-color: #eee"
   });

 svg.selectAll("rect")
   .data(myData)
   .enter()
   .append('rect')
   .attr({
     "x": function(d, i) { return i * (svgWidth / myData.length);},
     "y": function(d) { return svgHeight - (heightScale(d)); },  /* flip the chart */
     "width": svgWidth/myData.length - spacing,
     "height": function (d) { return (heightScale(d)); },
     "fill": function(d) { return (colorScale(d));}
   })
   //.append('title').text(function(d) {return d;});
   .on("mouseover", function(d) {
     d3.select("#tooltip")
       .classed("hidden", false)
       .style('left', d3.event.pageX + "px")
       .style('top', d3.event.pageY - 50 + "px");
       tooltip.html(d);
   })
   .on("mouseout", function() {
     d3.select("#tooltip").classed("hidden", true);
   });

 var yAxis = d3.svg.axis()
   .scale(heightScale)
   .orient("right")
   .ticks(5);

 svg.append('g')
 .attr("transform", "translate(35,0)")
 .call(yAxis);