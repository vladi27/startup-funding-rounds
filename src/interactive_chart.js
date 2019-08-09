export const interactiveChart = () => {
  let margin = { left: 80, right: 20, top: 50, bottom: 100 };

  let width = 1300 - margin.left - margin.right;
  let height = 700 - margin.top - margin.bottom;

  let flag = true;

  //var t = d3.transition().duration(750);

  let g = d3
    .select("#inter")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

  var xAxisGroup = g
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")");

  var yAxisGroup = g.append("g").attr("class", "y axis");

  //   // X Scale
  var x0 = d3
    .scaleBand()
    .range([0, width])
    .padding(0.1);

  var x1 = d3.scaleBand();

  //   // Y Scale
  var y = d3.scaleLinear().range([height, 0]);

  //   // X Label
  // var xLabel = g
  //   .append("text")
  //   .attr("y", height + 50)
  //   .attr("x", width / 2)
  //   .attr("font-size", "20px")
  //   .attr("text-anchor", "middle")
  //   .text("Round");

  // var xAxisCall = d3
  //   .axisBottom(x)
  //   .tickValues([400, 4000, 40000])
  //   .tickFormat(d3.format("$"));
  // g.append("g")
  //   .attr("class", "x axis")
  //   .attr("transform", "translate(0," + height + ")")
  //   .call(xAxisCall);

  var xAxis = d3.axisBottom(x0).tickSize(0);

  var yAxis = d3.axisLeft(y);

  // var xAxisGroup = g
  //     .append("g")
  //     .attr("class", "x axis")
  //     .attr("transform", "translate(0," + height + ")");

  //   var yAxisGroup = g.append("g").attr("class", "y axis");

  // var color = d3.scale
  //   .ordinal()
  //   .range(["#ca0020", "#f4a582", "#d5d5d5", "#92c5de", "#0571b0"]);

  var color = d3.scaleOrdinal(d3.schemePastel1);

  d3.json("../data/funding/new_funding.json").then(function(data) {
    //   //   //console.log(data);

    let rawData = data;

    let cleanData = d3
      .nest()
      //     // .key(function(d) {
      //     //   return d.funded;
      //     // })
      .key(function(d) {
        return d.funded;
      })
      .sortKeys(d3.ascending)
      .key(function(d) {
        return d.round;
      })
      .key(function(d) {
        return d.sector;
      })
      .rollup(function(v) {
        return d3.sum(v, function(d) {
          return d.amountRaised;
        });
      })
      .entries(rawData);

    //console.log(JSON.stringify(cleanData));

    var rounds = cleanData.map(function(d) {
      return d.values
        .filter(ele => {
          if (ele.key) return ele.key;
        })
        .map(ele2 => {
          return ele2.key;
        });
    });

    var elements = cleanData[0].values.map(ele => {
      return ele;
    });

    x0.domain(
      elements.map(ele => {
        return ele.key;
      })
    );

    x1.domain(
      cleanData[0].values[0].values.map(ele => {
        return ele.key;
      })
    ).rangeRound([0, x0.bandwidth()]);

    console.log(x1.domain());

    //console.log(cleanData[0].values);
    y.domain([
      0,
      d3.max(cleanData[0].values, function(rounds) {
        return d3.max(rounds.values, function(d) {
          return d.value;
        });
      })
    ]);
    // console.log(y.domain());

    g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    g.append("g")
      .attr("class", "y axis")
      .style("opacity", "0")
      .call(yAxis);
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("font-weight", "bold")
      .text("Value");

    g.selectAll(".y")
      .transition()
      .duration(500)
      .delay(1300)
      .style("opacity", "1");
    console.log("hello");

    var slice = g
      .selectAll("slice")
      .data(cleanData[0].values)
      .enter()
      .append("g")
      .attr("class", "g")
      .attr("transform", function(d) {
        return "translate(" + x0(d.key) + ",0)";
      });

    console.log(g.select(".y"));

    slice
      .selectAll("rect")
      .data(function(d) {
        return d.values;
      })
      .enter()
      .append("rect")
      .attr("width", x1.bandwidth)
      .attr("x", function(d) {
        //console.log(x1.range());
        return x1(d.key);
      })
      .style("fill", function(d) {
        return color(d.key);
      })
      .attr("y", function(d) {
        return y(0);
      })
      .attr("height", function(d) {
        return height - y(0);
      })
      .on("mouseover", function(d) {
        d3.select(this).style("fill", d3.rgb(color(d.key)).darker(2));
      })
      .on("mouseout", function(d) {
        d3.select(this).style("fill", color(d.key));
      });

    slice
      .selectAll("rect")
      .transition()
      .delay(function(d) {
        return Math.random() * 1000;
      })
      .duration(1000)
      .attr("y", function(d) {
        return y(d.value);
      })
      .attr("height", function(d) {
        return height - y(d.value);
      });
  });
};

// x0.domain(categoriesNames);
// x1.domain(rateNames).rangeRoundBands([0, x0.rangeBand()]);
// y.domain([
//   0,
//   d3.max(data, function(categorie) {
//     return d3.max(categorie.values, function(d) {
//       return d.value;
//     });
//   })
// ]);
