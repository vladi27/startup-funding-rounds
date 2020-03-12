export const chart = () => {
  let margin = { left: 120, right: 20, top: 10, bottom: 130 };

  let width = 1300 - margin.left - margin.right;
  let height = 700 - margin.top - margin.bottom;

  let g = d3
    .select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

  // X Label
  g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Year");

  // Y Label
  g.append("text")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Total Acquisitions, USD");

  d3.json("../data/acquisitions/object.json").then(data => {
    //console.log(data);

    data = data.slice().sort((a, b) => d3.ascending(a.year, b.year));

    data.forEach(d => {
      d.price = +d.price;
    });

    let x = d3
      .scaleBand()
      .domain(
        data.map(function(d) {
          return d.year;
        })
      )
      .range([0, width])
      .padding(0.2);

    let y = d3
      .scaleLinear()
      .domain([
        d3.min(data, d => {
          return 1e9 * Math.floor(d.price / 1e9);
        }),
        d3.max(data, d => {
          return 1e9 * Math.ceil(d.price / 1e9);
        })
      ])
      .nice(7)
      .range([height, 0]);

    //   { return 1e9*Math.floor(d["Tax Collection"]/1e9); },
    // d3.max( data, function(d){ return 1e9*Math.ceil(d["Tax Collection"]/1e9); }

    // X Axis
    let xAxisCall = d3.axisBottom(x);
    g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxisCall);

    // Y Axis
    let yAxisCall = d3
      .axisLeft(y)
      // .ticks(7)
      .tickFormat(function(d) {
        if (d !== 0) {
          return "$" + d / 1000000000 + "B";
        }
      });
    g.append("g")
      .attr("class", "y axis")
      // .attr("transform", "translate(0," - 50 + ")")
      .call(yAxisCall);

    let rects = g.selectAll("rect").data(data);

    rects
      .enter()
      .append("rect")
      .attr("y", d => {
        return y(d.price);
      })
      .attr("x", d => {
        //console.log(x(d.year));
        return x(d.year);
      })
      .attr("height", d => {
        return height - y(d.price);
      })
      .attr("width", x.bandwidth)
      .attr("fill", "orange");
  });
};
