import { SlowBuffer } from "buffer";
import { parseSvg } from "d3-interpolate/src/transform/parse";
import { selectAll } from "d3";

d3.selection.prototype.toggleClass = function (className) {
  this.classed(className, !this.classed(className));
  return this;
};
d3.selection.prototype.toggle = function () {
  var isHidden = this.style("display") == "none";
  return this.style("display", isHidden ? "inherit" : "none");
};

export const interactiveChart = () => {
  console.log("github test");

  let margin = { left: 60, right: 30, top: 80, bottom: 50 };

  let width = document.getElementById("inter").clientWidth;

  let height = width / 3.236;

  let flag = true;

  var t = d3.transition().duration(750);

  let abc =
    "Thanks for checking out my D3 visualization powered by the Crunchbase dataset!  ";

  let abd =
    " The bar chart above represents venture funding rounds for the period between 2000 and 2013.";

  let hero = "Rounds and Fundings Data";

  let abc2 =
    "The data is segmented by industries (web, mobile, software, web, medical), rounds (series A, series B, Angel, Series C+, Venture) and years.";

  let abc3 =
    " Press on the Play button to watch an animated show of inudstries' aggregated funding rounds over these years. Interested in learning more?";

  let abc4 =
    "Click on the Pause button to put animation on hold, then click any bar to drill down to the industry and round that caught your attention.";
  //d3.select("#intro").append("span");

  // .text(function(d) {
  //   return hero;
  // });

  // d3.selectAll("span")
  //   .append("h1")

  //   // .attr("class", "paragraph")
  //   .text(function (d) {
  //     return hero;
  //   });
  // d3.selectAll("span")
  //   .append("p")
  //   .attr("dy", "0em")
  //   .attr("class", "paragraph")
  //   .text(function (d) {
  //     return abc + "  " + " " + abd + " " + abc2 + " " + abc3 + " " + abc4;
  //   });

  // d3.selectAll("span")
  //   .append("p")
  //   .attr("dy", "1em")
  //   .attr("class", "paragraph")
  //   .text(function(d) {
  //     return abc2;
  //   });
  // d3.selectAll("span")
  //   .append("p")
  //   .attr("dy", "2em")
  //   .attr("class", "paragraph")
  //   .text(function(d) {
  //     return abc3;
  //   });
  // d3.selectAll("span")
  //   .append("p")
  //   .attr("dy", "2em")
  //   .attr("class", "paragraph")
  //   .text(function(d) {
  //     return abc4;
  //   });

  let svg = d3
    .select("#inter")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

  //   // X Scale
  let x0 = d3.scaleBand().range([0, width]).padding(0.1);

  let x1 = d3.scaleBand();

  d3.select("#goback-button").toggle();
  d3.select("#drilldown-container").toggle();

  let rawData;
  let testData;

  let interval;
  let cleanData;

  let barStep = 22;

  let barPadding = 3 / barStep;

  //   // Y Scale
  let y = d3.scaleLinear().range([height, 0]).nice(7);

  const makeYLines = () => d3.axisLeft().scale(y);

  let xAxis = d3.axisBottom(x0).tickSize(0);

  let yAxis = d3.axisLeft(y).tickFormat(function (d) {
    if (d !== 0 && d < 1000000000) {
      return "$" + d / 1000000 + "M";
    } else if (d !== 0) {
      return "$" + d / 1000000000 + "B";
    }
  });

  let tip = d3
    .tip()
    .attr("class", "d3-tip")
    .direction("e") // Position the tooltip to the right of a target element
    .offset([-10, 0])
    .html(function (d) {
      let text =
        "<strong>Company:</strong> <span style='color:red'>" +
        d.company +
        "</span><br>";
      text +=
        "<strong>Sector:</strong> <span style='color:red;text-transform:capitalize'>" +
        d.sector +
        "</span><br>";
      text +=
        "<strong>Round:</strong> <span style='color:red'>" +
        d.round +
        "</span><br>";
      text +=
        "<strong>Amount Raised:</strong> <span style='color:red'>" +
        d3.format("$,.0f")(d.amountRaised) +
        "</span><br>";
      return text;
    });

  let timeLabel = svg
    .append("text")
    .attr("class", "label")
    .attr("y", height + 20)
    .attr("x", width + 20)
    // .attr("font-size", "40px")
    // .attr("opacity", "0.4")
    .attr("text-anchor", "middle")
    .text("2000");

  let sectors = ["health", "enterprise", "finance", "ecommerce", "analytics"];
  let rounds = ["angel", "series-a", "series-b", "series-c+", "venture"];

  x0.domain(rounds);
  x1.domain(sectors).rangeRound([0, x0.bandwidth()]);

  x0.invert = function (x) {
    var domain = x0.domain();
    var range = x0.range();
    var scale = d3.scaleQuantize().range(domain).domain(range);
    return scale(x);
  };

  svg.append("g").attr("class", "y axis").style("opacity", "0");
  //.call(yAxis);

  svg
    .append("text")
    .attr("class", "label")
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

  // d3.json("./data/funding/test_data.json").then(function (data) {
  //   testData = data;
  // });

  d3.json("./data/funding/new_funding.json").then(function (data) {
    // console.log(data);

    rawData = data;

    let nestedData = d3
      .nest()
      //     // .key(function(d) {
      //     //   return d.funded;
      //     // })
      .key(function (d) {
        return d.funded;
      })
      .sortKeys(d3.ascending)
      .key(function (d) {
        return d.round;
      })
      .key(function (d) {
        return d.sector;
      })
      .rollup(function (v) {
        return d3.sum(v, function (d) {
          return d.amountRaised;
        });
      })
      .entries(rawData);

    cleanData = nestedData.slice();

    testData = d3
      .nest()
      //     // .key(function(d) {
      //     //   return d.funded;
      //     // })
      .key(function (d) {
        return d.funded;
      })
      .sortKeys(d3.ascending)
      .key(function (d) {
        return d.sector;
      })

      .entries(rawData);

    //cleanData = data;

    console.log(cleanData);

    // var rounds = cleanData.map(function(d) {
    //   return d.values
    //     .filter(ele => {
    //       if (ele.key) return ele.key;
    //     })

    //     .map(ele2 => {
    //       return ele2.key;
    //     });
    // });

    let elements = cleanData[0].values.map((ele) => {
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

    var xTicks = svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    xTicks.selectAll("text").style("font-size", 16).style("fill", "white");

    // d3.interval(function() {
    //   // At the end of our data, loop back
    //   time = time < 14 ? time + 1 : 0;
    //   update(cleanData[time]);
    // }, 5000);
    drawLegend();

    // First run of the visualization
    update(cleanData[0]);
  });

  $("#play-button").on("click", function () {
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

  $("#reset-button").on("click", function () {
    //clearInterval(interval);
    time = 0;
    update(cleanData[time]);
  });

  $("#goback-button").on("click", function () {
    restore();
  });

  // $("#industry-select").on("change", function () {
  //   clearInterval(interval);
  //   interval = setInterval(step, 3000);
  //   step(cleanData[time]);
  // });

  d3.select("#industry-select").on("change", function () {
    if (d3.select("#play-button").text() === "Pause") {
      const current = time;
      d3.selectAll("rect.current").interrupt();
      clearInterval(interval);
      interval = setInterval(step, 3000);
      step(cleanData[current]);
    } else {
      update(cleanData[time]);
    }
  });

  $("#date-slider").slider({
    max: 2013,
    min: 2000,
    step: 1,
    animate: "slow",
    slide: function (event, ui) {
      time = ui.value - 2000;
      update(cleanData[time]);
    },
  });

  // let intro = "Explore";
  // document.getElementById("text").innerHTML = intro;

  function step() {
    // At the end of our data, loop back
    time = time < 14 ? time + 1 : 0;
    update(cleanData[time]);
  }

  function update(data) {
    // data = data.slice().array.forEach(element => {});

    if (data == undefined) {
      return;
    }
    console.log(data);
    y.domain([
      0,
      d3.max(data.values, function (rounds) {
        console.log(rounds);
        return d3.max(rounds.values, function (d) {
          if (d3.select("#industry-select").node().value !== "all") {
            let selected = d3.select("#industry-select").node().value;
            console.log(selected, d, "selected");
            if (d.key === selected) {
              return d.value;
            }
          } else {
            return d.value;
          }
          return 1000000;
        });
      }),
    ]);

    svg
      .selectAll("g.y.axis")
      .transition()
      .duration(1000)
      .delay(300)
      .style("opacity", "1")
      .call(yAxis);

    //.call(yAxis);
    svg.selectAll(".slice").exit().remove();

    let slice2 = svg
      .selectAll(".slice")
      .data(data.values)
      .enter()
      .append("g")
      .attr("class", "g")
      //.classed("current", true)
      .attr("transform", function (d) {
        return "translate(" + x0(d.key) + ",0)";
      });

    console.log("slice,", slice2);

    let rects = slice2.selectAll("rect").data(function (d) {
      return d.values.filter(function (d) {
        if (d3.select("#industry-select").node().value == "all") {
          return d;
        } else {
          return d.key == d3.select("#industry-select").node().value;
        }
      });
    });

    console.log(rects);

    svg
      .selectAll("rect.current")

      // rects
      .transition(750)
      .delay(function (d) {
        return Math.random() * 100;
      })
      .attr("height", function (d) {
        return 0;
      })
      .attr("y", function (d) {
        if (y(0)) {
          return y(0);
        }
        return 0;
      })
      .remove();

    rects
      .enter()
      .append("rect")
      .attr("class", "current")
      // .attr("class", "enter")
      .attr("width", x1.bandwidth)
      .attr("x", function (d) {
        //console.log(x1(d.key), d.key);
        return x1(d.key);
      })
      .attr("data-legend", function (d) {
        return d.key;
      })
      .style("fill", function (d) {
        return color(d.key);
      })
      .attr("y", function (d) {
        return y(0);
      })
      .attr("height", function (d) {
        return 0;
      })
      .on("click", function (d) {
        let round = x0.invert(
          parseSvg(d3.select(this.parentNode).attr("transform")).translateX
        );

        // d3.select("g").
        // transition(t).remove();
        drillDown(d, slice2, round);
      })
      .attr("cursor", "pointer")
      .on("mouseover", function (d) {
        d3.select(this).style("fill", d3.rgb(color(d.key)).darker(2));
      })
      .on("mouseout", function (d) {
        d3.select(this).style("fill", color(d.key));
      })
      .on("change", function (d) {
        if (d3.select("#play-button").text() === "Play") {
          d3.selectAll("rect")
            .transition()
            .duration(100)
            .attr("y", function (d) {
              return y(d.value);
            })
            .attr("height", function (d) {
              return height - y(d.value);
            });
        }
      })
      .on("change", function (d) {
        if (d3.select("#play-button").text() === "Play") {
          d3.selectAll("rect")
            .transition()
            .duration(100)
            .attr("y", function (d) {
              return y(d.value);
            })
            .attr("height", function (d) {
              return height - y(d.value);
            });
        }
      })

      //.merge(rects)
      .transition(t)
      .delay(function (d) {
        return Math.random() * 1000;
      })
      //.duration(500)
      .attr("y", function (d) {
        return y(d.value);
      })
      .attr("height", function (d) {
        console.log(d);
        return height - y(d.value);
      });

    console.log(rects);

    //svg.selectAll(".slice").exit();
    console.log(rects);

    let rects2 = slice2.selectAll("rect");
    let button2 = d3.select("#play-button");

    //svg.selectAll("g.legend").remove();

    //drawLegend.call(this);

    // d3.selectAll(".y")
    //   .transition()
    //   .duration(1000)
    //   .delay(300)
    //   .style("opacity", "1");

    timeLabel.text(+(time + 2000));

    $("#year")[0].innerHTML = +(time + 2000);

    $("#date-slider").slider("value", +(time + 2000));
  }

  function drawLegend() {
    var legendHolder = svg

      .append("g")

      .attr("class", "legend-container");
    // translate the holder to the right side of the graph
    //.attr("transform", "translate(" + 0 + "," + height - margin.bottom + ")");

    var dataL = 0;
    var offset = 100;
    const legend = legendHolder
      .selectAll(".legend")

      .data(sectors)
      .enter()
      .append("g")
      .attr("class", "legend")

      .attr("transform", function (d, i) {
        if (i === 0) {
          dataL = d.length + offset;
          return "translate(0,0)";
        } else {
          var newdataL = dataL;
          dataL += d.length + offset;
          return "translate(" + newdataL + ",0)";
        }
      });

    // .attr("transform", function (d, i) {
    //   return "translate(14," + 25 * i + ")";
    // });

    // legend
    //   .append("rect")
    //   .attr("fill", (d, i) => color(d)) //   const color = d3.scaleOrdinal(d3.schemeCategory10);
    //   .attr("height", 18)
    //   .attr("width", 18);

    legend
      .append("rect")
      .attr("x", 0)

      .attr("y", height + 40)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", function (d, i) {
        return color(d);
      });
    legend
      .append("text")
      .attr("x", 15)
      .attr("y", height + 48)
      //.attr("dy", ".35em")
      .text(function (d, i) {
        return d;
      })
      .attr("class", "textselected")
      .style("text-anchor", "start")
      .style("font-size", 16);

    // legend
    //   .append("text")
    //   // .attr("x", 18)
    //   // .attr("y", 10)
    //   .attr("x", width - 24)
    //   .attr("y", 9)
    //   .attr("dy", ".15em")
    //   .text((d, i) => d)
    //   .style("text-anchor", "start")
    //   .style("font-size", 12);

    // Now space the groups out after they have been appended:
    // const padding = 10;
    // legend.attr("transform", function(d, i) {
    //   return (
    //     "translate(" +
    //     (d3.sum(sectors, function(e, j) {
    //       if (j < i) {
    //         return legend.nodes()[j].getBBox().width;
    //       } else {
    //         return 0;
    //       }
    //     }) +
    //       padding * i) +
    //     ",0)"
    //   );
    // });
  }

  function bar(svg2, down, data, selector, x3) {
    const g = svg2
      .insert("g", selector)
      .attr("class", "enter")
      .attr("transform", `translate(0,${barStep * barPadding})`)
      .attr("text-anchor", "end")
      .style("font", "13px sans-serif");

    const bar = g
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("cursor", "pointer")
      //  .on("click", d => update(cleanData[time]))
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide);

    bar
      .append("text")
      .attr("x", 13)
      .attr("y", (27 * (1 - 0.1)) / 2)
      .attr("dy", ".35em")
      .text((d) => d.company.slice(0, 3).toUpperCase());

    bar
      .append("rect")
      .attr("x", x3(0))
      .attr("class", "bar")
      .attr("width", function (d) {
        console.log(x3(0));
        return x3(d.amountRaised) - x3(0);
      })
      .attr("height", 27 * (1 - 0.3));

    return g;
  }

  function drillDown(d, slice, round) {
    let unsortedData = testData[time];
    const duration = 700;
    const transition1 = d3.transition().duration(duration);
    const transition2 = transition1.transition();

    console.log(unsortedData);
    console.log(d);
    console.log(round);
    console.log(testData);

    let ab = testData.map((ele) => Object.values(ele));

    let newData = unsortedData.values.filter((ele) => {
      if (ele.key === d.key) {
        return ele;
      }
    });

    console.log(newData, "1");

    let newData2 = newData[0].values.filter((ele) => {
      if (ele.round === round) {
        return ele;
      }
    });

    let newData3 = newData2
      .slice()
      .sort((a, b) => d3.descending(a.amountRaised, b.amountRaised))
      .slice(0, 10);

    let lineChartData = getData(d, round);

    console.log(lineChartData);

    console.log(newData3);

    console.log(newData2);

    // let rects = g.selectAll("rect").data(newData);
    let data = newData3;

    d3.selectAll("#inter svg").remove();
    d3.select("#drilldown-container").toggle();

    // $("#play-button").text("Go Back");
    // $("#play-button").on("click", function() {
    //   let button = $(this);
    //   button.text("Play");

    //   restore();
    // });

    // d3.select("#play-button").style("opacity", "0");
    d3.select("#play-button").toggle();
    // d3.select("#reset-button").style("opacity", "0");
    d3.select("#reset-button").toggle();
    // d3.select("#slider-div").style("opacity", "0");
    d3.select("#slider-div").toggle();
    // d3.select("#industry-select").style("opacity", "0");
    d3.select("#industry-select").toggle();
    // d3.select("#year").style("opacity", "0");
    d3.select("#year").toggle();
    // d3.select("#intro").style("opacity", "0");

    // d3.selectAll("text").style("opacity", "0");
    //d3.selectAll("text").toggle();

    //d3.select("#goback-button").style("opacity", "1");
    d3.select("#goback-button").toggle();

    // g.selectAll("g.x.axis").remove();
    // slice.remove();

    const svg = d3.select("svg");
    const margin3 = { top: 30, right: 20, bottom: 60, left: 15 };
    const width3 = +svg.attr("width") / 2.25 - margin3.left - margin3.right;
    const height3 = +svg.attr("height") / 1 - margin3.top - margin3.bottom;

    console.log(svg, margin3, width3, height3);

    const gContainer = svg
      .append("g")
      .attr("transform", "translate(0, 30)")
      .classed("weekly-container", true);

    const g = gContainer
      .append("g")
      .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");

    // const svg2 = d3
    //   .select("#drilldown-container")
    //   .append("svg")
    //   .attr("class")
    //   .attr("width", width + margin.left + margin.right)
    //   .attr("height", height + margin.top + margin.bottom)
    //   .append("g")
    //   .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    console.log(g);

    g.call(tip);
    const x3 = d3.scaleLinear().range([margin3.left, width3 - margin3.right]);

    x3.domain([0, data[0].amountRaised]);
    console.log(x3.domain());

    g.append("rect")
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .attr("width", width3)
      .attr("height", height3)
      .attr("cursor", "pointer");

    // .on("click", d => up(svg, d));
    let xAxis2 = (g) => {
      g.attr("class", "x-axis")
        .attr("transform", `translate(0 ,${margin3.top})`)
        .call(d3.axisTop(x3).ticks(width3 / 150, "s"))
        .call((g) =>
          (g.selection ? g.selection() : g).select(".domain").remove()
        );
    };

    let yAxis2 = (g) =>
      g
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin3.left + 0.5},0)`)
        .call((g) =>
          g
            .append("line")
            .attr("stroke", "currentColor")
            .attr("y1", margin3.top)
            .attr("y2", height3)
        );

    g.append("g").call(xAxis2);

    g.append("g").call(yAxis2);

    let placeholder = d.key;

    g.append("text")
      .attr("class", "title")
      .attr("x", width3 / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .text(
        (d) =>
          `Largest ${round} rounds in the ${placeholder} Industry in ${
            time + 2000
          }`
      );

    // svg2.call(tip)

    // .on("click", d => up(svg, d));

    const enter = bar(g, drillDown, data, ".y-axis", x3).attr(
      "fill-opacity",
      0
    );
    console.log(enter);
    enter.transition(transition1).attr("fill-opacity", 1);

    // Transition entering bars to their new y-position.
    enter
      .selectAll("g")
      //.attr("transform", stack(d.index))
      .transition(transition1)
      .attr("transform", stagger(x3));

    // Update the x-scale domain.

    // Update the x-axis.
    g.selectAll(".x-axis").transition().call(xAxis2, width3);

    // Transition entering bars to the new x-scale.
    enter
      .selectAll("g")
      .transition(transition2)
      .attr("transform", (d, i) => `translate(0,${barStep * i + 30})`);

    // Color the bars as parents; they will fade to children if appropriate.
    enter
      .selectAll("rect")
      .transition(t)
      .attr("fill", (d) => color(d.sector))
      .attr("fill-opacity", 1)
      .transition()
      .attr("fill", (d) => color(d.sector))
      .attr("width", (d) => x3(d.amountRaised));

    buildLineChart(lineChartData, placeholder, round);

    // d3.selectAll("svg")
    //   .attr("class", "background")
    //   // .attr("fill", "none")
    //   .attr("pointer-events", "all")
    //   // .attr("width", width + margin.right + margin.left)
    //   // .attr("height", height)
    //   .attr("cursor", "pointer")
    //   .attr("transform", "translate(-250, -30)")
    //   .on("dblclick", d => {
    //     d3.event.preventDefault();
    //     restore(d);
    //   });
  }

  // function stack(i) {
  //   let value = 0;
  //   return (d) => {
  //     const t = `translate(${x3(value)},${barStep * i})`;
  //     value += d.amountRaised;
  //     return t;
  //   };
  // }

  function stagger(x3) {
    let value = 0;
    return (d, i) => {
      const t = `translate(${x3(value)},${barStep * i + 50})`;
      value += d.amountRaised;
      return t;
    };
  }

  function getData(d, round) {
    let results = [];

    let i = 0;

    while (i < 14) {
      let obj = {};
      let unsortedData = testData[i];

      let newData = unsortedData.values.filter((ele) => {
        if (ele.key === d.key) {
          return ele;
        }
      });

      if (newData[0] === undefined) {
        results.push({ y: 0 });
        i++;
        continue;
      }

      let newData2 = newData[0].values.filter((ele) => {
        if (ele.round === round) {
          return ele;
        }
      });

      let sum = 0;

      newData2.forEach((ele) => {
        sum += ele.amountRaised;
      });
      obj["y"] = sum;
      results.push(obj);
      i++;
    }
    return results;
  }

  function buildLineChart(lineChartData, placeholder, round) {
    const svg = d3.select("svg");
    var margin2 = { top: 30, right: 60, bottom: 60, left: 15 },
      width2 = +svg.attr("width") / 1.75 - margin2.left - margin2.right,
      height2 = +svg.attr("height") / 1 - margin2.top - margin2.bottom;
    let n = 13;
    let sortedData = lineChartData
      .slice()
      .sort((a, b) => d3.descending(a.y, b.y));

    console.log(sortedData);

    let xScale3 = d3
      .scaleLinear()
      .domain([2000, 2013]) // input
      .range([0, width2]);
    // o

    let yScale = d3
      .scaleLinear()
      .domain([0, sortedData[0].y]) // input
      .range([height2, 0]);

    console.log(yScale.domain());

    let div = d3
      .select("body")
      .append("div") // declare the tooltip div
      .attr("class", "tooltip") // apply the 'tooltip' class
      .style("opacity", 0);

    let line = d3
      .line()
      .x(function (d, i) {
        return xScale3(i + 2000);
      }) // set the x values for the line generator
      .y(function (d) {
        return yScale(d.y);
      }) // set the y values for the line generator
      .curve(d3.curveMonotoneX); // apply smoothing to the line

    var gContainer2 = svg
      .append("g")
      .attr("transform", "translate(560, 40)")
      .classed("yearly-container", true);

    var svg3 = gContainer2
      .append("g")
      .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
    // .attr("cursor", "pointer")

    // .append("g")

    // .attr("transform", "translate(" + 50 + ", " + margin.top + ")");

    console.log(svg3);

    svg3
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height2 + ")")
      .call(d3.axisBottom(xScale3).tickFormat(d3.format("d")));

    svg3
      .append("g")
      .attr("class", "y axis")
      .call(
        d3.axisLeft(yScale).tickFormat(function (d) {
          if (d !== 0 && d < 1000000000) {
            return "$" + d / 1000000 + "M";
          } else if (d !== 0) {
            return "$" + d / 1000000000 + "B";
          }
        })
      );

    svg3
      .append("path")
      .datum(lineChartData) // 10. Binds data to the line
      .attr("class", "line") // Assign a class for styling
      .attr("d", line);

    svg3
      .selectAll(".dot")
      .data(lineChartData)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", "dot") // Assign a class for styling
      .attr("cx", function (d, i) {
        return xScale3(i + 2000);
      })
      .attr("cy", function (d) {
        return yScale(d.y);
      })
      .attr("r", function (d, i) {
        if (i === time) {
          return 7;
        } else {
          return 5;
        }
      })
      .style("fill", function (d, i) {
        if (i === time) return "red";
      })
      .on("mouseover", function (d, i) {
        div.transition().duration(200).style("opacity", 0.9);
        div
          .html(
            i + 2000 + ": " + " $" + d3.format(".2s")(d["y"]).replace(/G/, "B")
          )
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 28 + "px");
      })
      .on("mouseout", function (d) {
        div.transition().duration(500).style("opacity", 0);
      });

    svg3
      .append("text")
      .attr("class", "title")
      .attr("x", width2 / 2)
      .attr("y", -30)
      .attr("text-anchor", "middle")
      .text(
        (d) =>
          `Total Raised per Year in ${round} in the ${placeholder} Industry, 2000-2013`
      );
  }

  function restore() {
    d3.selectAll("svg").remove();

    svg = d3
      .select("#inter")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    svg
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("font-weight", "bold")
      .text("Value");

    timeLabel = svg
      .append("text")
      .attr("class", "label")
      .attr("y", height - 90)
      .attr("x", width - 40)
      // .attr("font-size", "40px")
      // .attr("opacity", "0.4")
      .attr("text-anchor", "middle")
      .text(`${time + 2000}`);

    // d3.select("#goback-button").style("opacity", "0");
    d3.select("#goback-button").toggle();

    // d3.select("#play-button").style("opacity", "1");
    // d3.select("#reset-button").style("opacity", "1");
    // d3.select("#slider-div").style("opacity", "1");
    // d3.select("#industry-select").style("opacity", "1");
    // d3.selectAll("text").style("opacity", "1");
    // d3.select("#intro").style("opacity", "1");

    d3.select("#play-button").toggle();
    // d3.select("#reset-button").style("opacity", "0");
    d3.select("#reset-button").toggle();
    // d3.select("#slider-div").style("opacity", "0");
    d3.select("#slider-div").toggle();
    // d3.select("#industry-select").style("opacity", "0");
    d3.select("#industry-select").toggle();
    // d3.select("#year").style("opacity", "0");
    d3.select("#year").toggle();
    // d3.select("#intro").style("opacity", "0");

    // d3.selectAll("text").style("opacity", "0");
    //d3.selectAll("text").toggle();

    //d3.select("#goback-button").style("opacity", "1");
    //d3.select("#goback-button").toggle();

    const duration = 750;
    const transition1 = d3.transition().duration(duration);
    const transition2 = transition1.transition();

    const exit = svg.selectAll(".enter").attr("class", "exit");
    exit.selectAll("text").remove();
    // Entering nodes immediately obscure the clicked-on bar, so hide it.
    // exit.selectAll("rect").attr("fill-opacity", p => (p === d ? 0 : null));

    // Transition exiting bars to fade out.
    exit
      .selectAll("rects")
      .transition(transition2)
      .attr("transform", (d, i) => `translate(${-barStep * i + 20}, 0)`)
      //.attr("width", d => 0)
      // .attr("fill-opacity", 0)

      // .attr("transform", stack(d.index))
      // .transition(transition1)
      // .attr("transform", stagger())
      .remove();

    d3.selectAll("g.y-axis").remove();

    d3.selectAll("g.x-axis").remove();

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .transition()
      .call(xAxis);

    svg.append("g").attr("class", "y axis").style("opacity", "0");

    d3.select("#year").style("opacity", "1");

    update(cleanData[time]);
  }
};
