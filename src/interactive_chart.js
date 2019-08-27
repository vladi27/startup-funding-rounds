import { SlowBuffer } from "buffer";
import { parseSvg } from "d3-interpolate/src/transform/parse";

export const interactiveChart = () => {
  let margin = { left: 80, right: 20, top: 50, bottom: 100 };

  let width = 1300 - margin.left - margin.right;
  let height = 700 - margin.top - margin.bottom;

  let flag = true;

  var t = d3.transition().duration(750);

  let g = d3
    .select("#inter")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

  //   // X Scale
  let x0 = d3
    .scaleBand()
    .range([0, width])
    .padding(0.1);

  let x1 = d3.scaleBand();

  let rawData;
  let testData;

  let interval;
  let cleanData;

  let barStep = 27;

  let barPadding = 3 / barStep;

  //   // Y Scale
  let y = d3.scaleLinear().range([height, 0]);

  let xAxis = d3.axisBottom(x0).tickSize(0);

  let yAxis = d3.axisLeft(y);

  let timeLabel = g
    .append("text")
    .attr("y", height + 50)
    .attr("x", width - 40)
    .attr("font-size", "40px")
    .attr("opacity", "0.4")
    .attr("text-anchor", "middle")
    .text("2000");

  let sectors = ["mobile", "software", "web", "ecommerce", "medical"];
  let rounds = ["series-a", "series-b", "angel", "series-c+", "venture"];

  x0.domain(rounds);
  x1.domain(sectors).rangeRound([0, x0.bandwidth()]);

  x0.invert = function(x) {
    var domain = x0.domain();
    var range = x0.range();
    var scale = d3
      .scaleQuantize()
      .range(domain)
      .domain(range);
    return scale(x);
  };

  g.append("g")
    .attr("class", "y axis")
    .style("opacity", "0");
  //.call(yAxis);

  g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .style("font-weight", "bold")
    .text("Value");

  // var xAxisGroup = g
  //     .append("g")
  //     .attr("class", "x axis")
  //     .attr("transform", "translate(0," + height + ")");

  //   var yAxisGroup = g.append("g").attr("class", "y axis");

  // var color = d3.scale
  //   .ordinal()
  //   .range(["#ca0020", "#f4a582", "#d5d5d5", "#92c5de", "#0571b0"]);

  var color = d3.scaleOrdinal(d3.schemeSet1);

  let time = 0;

  let x3 = d3.scaleLinear().range([margin.left, width - margin.right]);

  let xAxis2 = g =>
    g
      .attr("class", "x-axis")
      .attr("transform", `translate(0 ,${margin.top})`)
      .call(d3.axisTop(x3).ticks(width / 90, "s"))
      .call(g => (g.selection ? g.selection() : g).select(".domain").remove());

  let yAxis2 = g =>
    g
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left + 0.5},0)`)
      .call(g =>
        g
          .append("line")
          .attr("stroke", "currentColor")
          .attr("y1", margin.top)
          .attr("y2", height - margin.bottom)
      );

  d3.json("../data/funding/new_funding.json").then(function(data) {
    // console.log(data);

    rawData = data;

    cleanData = d3
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

    testData = d3
      .nest()
      //     // .key(function(d) {
      //     //   return d.funded;
      //     // })
      .key(function(d) {
        return d.funded;
      })
      .sortKeys(d3.ascending)
      .key(function(d) {
        return d.sector;
      })
      .entries(rawData);

    console.log(testData);

    // var rounds = cleanData.map(function(d) {
    //   return d.values
    //     .filter(ele => {
    //       if (ele.key) return ele.key;
    //     })
    //     .map(ele2 => {
    //       return ele2.key;
    //     });
    // });

    let elements = cleanData[0].values.map(ele => {
      return ele;
    });

    // x1.domain(sectors).rangeRound([0, x0.bandwidth()]);

    // x1.domain(
    //   cleanData[0].values[0].values.map(ele => {
    //     return ele.key;
    //   })
    // ).rangeRound([0, x0.bandwidth()]);

    // y.domain([
    //   0,
    //   d3.max(cleanData[0].values, function(rounds) {
    //     return d3.max(rounds.values, function(d) {
    //       return d.value;
    //     });
    //   })
    // ]);

    g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    // d3.interval(function() {
    //   // At the end of our data, loop back
    //   time = time < 14 ? time + 1 : 0;
    //   update(cleanData[time]);
    // }, 5000);

    // First run of the visualization
    update(cleanData[0]);
  });

  // let button = d3.select("#play-button");
  // console.log(button);

  $("#play-button").on("click", function() {
    let button = $(this);
    if (button.text() == "Play") {
      button.text("Pause");
      interval = setInterval(step, 3000);
      step();
    } else {
      button.text("Play");
      clearInterval(interval);
    }
  });

  $("#reset-button").on("click", function() {
    time = 0;
    update(cleanData[0]);
  });

  $("#industry-select").on("change", function() {
    update(cleanData[time]);
  });

  $("#date-slider").slider({
    max: 2013,
    min: 2000,
    step: 1,
    animate: "slow",
    slide: function(event, ui) {
      time = ui.value - 2000;
      update(cleanData[time]);
    }
  });

  function step() {
    // At the end of our data, loop back
    time = time < 14 ? time + 1 : 0;
    update(cleanData[time]);
  }

  function update(data) {
    let elements = data.values.map(ele => {
      return ele;
    });

    // data = data.slice().array.forEach(element => {});

    y.domain([
      0,
      d3.max(data.values, function(rounds) {
        return d3.max(rounds.values, function(d) {
          return d.value;
        });
      })
    ]);

    //.call(yAxis);

    let slice2 = g
      .selectAll(".slice")
      .data(data.values)
      .enter()
      .append("g")
      .attr("class", "g")
      .attr("transform", function(d) {
        return "translate(" + x0(d.key) + ",0)";
      });

    let rects = slice2.selectAll("rect").data(function(d) {
      return d.values.filter(function(d) {
        if (d3.select("#industry-select").node().value == "all") {
          return d;
        } else {
          return d.key == d3.select("#industry-select").node().value;
        }
      });
    });

    console.log(rects);

    g.selectAll("rect")
      .transition(t)
      .delay(function(d) {
        return Math.random() * 50;
      })
      .attr("height", function(d) {
        return 0;
      })
      .attr("y", function(d) {
        return y(0);
      })
      .remove();

    // var industry = $("#industry-select").val();

    // data.filter(function(d) {
    //   if (industry == "all") {
    //     return true;
    //   } else {
    //     return d.key == industry;
    //   }
    // });

    // slice.exit().remove();
    //rects.exit().remove();

    // rects
    //   .exit()
    //   .transition(t)
    //   .attr("height", 0)
    //   .remove();

    //rects.remove();
    // let button2 = d3.select("#play-button");
    // if (button2.text() === "Pause") {
    //   rects.remove();
    // }

    // slice2.selectAll("g.rect").remove();

    rects
      .enter()
      .append("rect")
      // .attr("class", "enter")
      .attr("width", x1.bandwidth)
      .attr("x", function(d) {
        //console.log(x1(d.key), d.key);
        return x1(d.key);
      })
      .style("fill", function(d) {
        return color(d.key);
      })
      .attr("y", function(d) {
        return y(0);
      })
      .attr("height", function(d) {
        return 0;
      })
      .on("click", function(d) {
        let round = x0.invert(
          parseSvg(d3.select(this.parentNode).attr("transform")).translateX
        );

        // d3.select("g").
        // transition(t).remove();
        drillDown(d, slice2, round);
      })
      // .on("mouseover", function(d) {
      //   d3.select(this).style("fill", d3.rgb(color(d.key)).darker(2));
      // })
      // .on("mouseout", function(d) {
      //   d3.select(this).style("fill", color(d.key));
      // })
      .on("change", function(d) {
        if (d3.select("#play-button").text() === "Play") {
          d3.selectAll("rect")
            .transition()
            .duration(100)
            .attr("y", function(d) {
              return y(d.value);
            })
            .attr("height", function(d) {
              return height - y(d.value);
            });
        }
      })

      //.merge(rects)
      .transition(t)
      .delay(function(d) {
        return Math.random() * 1000;
      })
      //.duration(500)
      .attr("y", function(d) {
        return y(d.value);
      })
      .attr("height", function(d) {
        return height - y(d.value);
      });

    let rects2 = slice2.selectAll("rect");
    let button2 = d3.select("#play-button");

    g.selectAll("g.y.axis")
      .transition()
      .duration(1000)
      .delay(300)
      .style("opacity", "1")
      .call(yAxis);

    // d3.selectAll(".y")
    //   .transition()
    //   .duration(1000)
    //   .delay(300)
    //   .style("opacity", "1");

    timeLabel.text(+(time + 2000));

    $("#year")[0].innerHTML = +(time + 2000);

    $("#date-slider").slider("value", +(time + 2000));
  }

  function bar(g, down, data, selector) {
    const bars = g
      .insert("g", selector)
      .attr("class", "enter")
      .attr("transform", `translate(0,${50 + barStep * barPadding})`)
      .attr("text-anchor", "end")
      .style("font", "10px sans-serif");

    const bar = bars
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("cursor", "pointer");
    // .on("click", d => down(svg, d));

    bar
      .append("text")
      .attr("x", 80 - 6)
      .attr("y", (27 * (1 - 0.1)) / 2)
      .attr("dy", ".35em")
      .text(d => d.company);

    bar
      .append("rect")
      .attr("x", x3(0))
      .attr("width", function(d) {
        console.log(x3(0));
        return x3(d.amountRaised) - x3(0);
      })
      .attr("height", 27 * (1 - 0.3));

    return bars;
  }

  function drillDown(d, slice, round) {
    let unsortedData = testData[time];
    const duration = 750;
    const transition1 = g.transition().duration(duration);
    const transition2 = transition1.transition();

    console.log(unsortedData);
    console.log(d);
    console.log(round);

    let newData = unsortedData.values.filter(ele => {
      if (ele.key === d.key) {
        return ele;
      }
    });

    let newData2 = newData[0].values.filter(ele => {
      if (ele.round === round) {
        return ele;
      }
    });

    let newData3 = newData2
      .slice()
      .sort((a, b) => d3.descending(a.amountRaised, b.amountRaised))
      .slice(0, 10);

    console.log(newData3);

    console.log(newData2);

    // let rects = g.selectAll("rect").data(newData);
    let data = newData3;

    const exit = g.selectAll("rect").attr("class", "exit");

    // Entering nodes immediately obscure the clicked-on bar, so hide it.
    exit.selectAll("rect").attr("fill-opacity", p => (p === d ? 0 : null));

    // Transition exiting bars to fade out.
    exit
      .transition(t)
      .attr("fill-opacity", 0)
      .remove();

    g.selectAll("g.y.axis").remove();

    g.selectAll("g.x.axis").remove();
    slice.remove();

    x3.domain([0, data[0].amountRaised]);
    console.log(x3.domain());

    g.append("g").call(xAxis2);

    g.append("g").call(yAxis2);

    const enter = bar(g, drillDown, data, ".y-axis").attr("fill-opacity", 0);
    console.log(enter);
    enter.transition(transition1).attr("fill-opacity", 1);

    // Transition entering bars to their new y-position.
    enter
      .selectAll("g")
      .attr("transform", stack(d.index))
      .transition(transition1)
      .attr("transform", stagger());

    // Update the x-scale domain.

    // Update the x-axis.
    g.selectAll(".x-axis")
      .transition(transition2)
      .call(xAxis2);

    // Transition entering bars to the new x-scale.
    enter
      .selectAll("g")
      .transition(transition2)
      .attr("transform", (d, i) => `translate(0,${barStep * i})`);

    // Color the bars as parents; they will fade to children if appropriate.
    enter
      .selectAll("rect")
      .attr("fill", color(true))
      .attr("fill-opacity", 1)
      .transition(transition2)
      // .attr("fill", d => color(!!d.children))
      .attr("width", d => x3(d.amountRaised) - x3(0));
  }

  function stack(i) {
    let value = 0;
    return d => {
      const t = `translate(${x3(value) - x3(0)},${barStep * i})`;
      value += d.amountRaised;
      return t;
    };
  }

  function stagger() {
    let value = 0;
    return (d, i) => {
      const t = `translate(${x3(value) - x3(0)},${barStep * i})`;
      value += d.amountRaised;
      return t;
    };
  }

  // y.range([0, width]);

  // x0.domain(
  //   data.map(function(d) {
  //     return d.company;
  //   })
  // );

  // xAxis = d3.axisLeft(x0);
  // yAxis = d3.axisTop(y).ticks(width / 100, "s");
};

//   clearTimeout(timeout);

//   d3.transition()
//     .duration(altKey ? 7500 : 750)
//     .each(redraw);
// }

// slice2
//   .transition()
//   .duration(1500)
//   .delay(3000)
//   .selectAll("rect")
//   .remove();

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
