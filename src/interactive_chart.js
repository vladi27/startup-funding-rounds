import { SlowBuffer } from "buffer";
import { parseSvg } from "d3-interpolate/src/transform/parse";
import { selectAll, selectorAll } from "d3";
import { toggleDrilldown, toggleMainPage } from "./toggle";
import { handleDrillDown } from "./drilldown";

const sectors = ["medical", "web", "mobile", "ecommerce", "software"];
const rounds = ["angel", "series-a", "series-b", "series-c+", "venture"];

const appendParagraph = (height) => {
  const hero = "Venture Rounds";
  const curWidth = document.getElementById("inter").clientWidth;

  const sentence1 =
    "Thanks for checking out my D3 visualization powered by the Crunchbase dataset!";

  const sentence2 =
    "The bar chart represents venture financing events that occurred between 2000 and 2013.";

  const sentence3 =
    " The data is segmented by industries (web, mobile, software, eCommerce, medical), rounds (series A, series B, Angel, Series C and later, Venture) and years.";

  const sentence4 =
    "Press the Play button to watch an animated show of aggregated funding rounds over these years. Interested in learning more?";

  const sentence5 =
    " Hit the Pause button to put animation on hold, and then click on the relevant bar to drill down to the industry and round that caught your attention. Happy explorations!";

  d3.select("#paragraph").append("h1").text(hero);
  d3.select("#paragraph")
    .append("p")
    .html(
      "Thanks for checking out my D3 visualization powered by the" +
        " " +
        "<a href='https://crunchbase.com'>Crunchbase</a>" +
        " " +
        "data!" +
        "<br>" +
        sentence2 +
        sentence3 +
        "<br>" +
        sentence4 +
        sentence5
    );

  // adding dynamic width;
  const paragraph = document.getElementById("paragraph");
  paragraph.style.height = height + "px";
  paragraph.style.width = curWidth * 0.4 + "px";

  // event listener to optimize for mobile
  window.addEventListener("resize", resizeParagraph);
};

const resizeParagraph = () => {
  const curWidth = document.getElementById("inter").clientWidth;
  const div = document.getElementById("paragraph");
  const windowWidth = window.innerWidth;
  if (windowWidth < 1000) {
    div.style.right = "auto";
    div.style.top = "auto";
    div.style.width = "100%";
  } else {
    div.style.right = "0";
    div.style.top = "0";
    div.style.width = curWidth * 0.3 + "px";
  }
};

export const interactiveChart = () => {
  // function to change paragraph position based on the window width

  // svg dimensions
  const margin = { left: 60, right: 30, top: 60, bottom: 50 };
  const width =
    document.getElementById("inter").clientWidth / 2 -
    margin.left -
    margin.right;
  const height = width * 1.15;

  //append description paragraph
  appendParagraph(height);

  let svg = d3
    .select("#inter") //id=inter
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

  let y = d3.scaleLinear().range([height, 0]).nice(7);
  let yAxis = d3
    .axisLeft(y)
    .tickFormat(function (d) {
      if (d !== 0 && d < 1000000000) {
        return "$" + d / 1000000 + "M";
      } else if (d !== 0) {
        return "$" + d / 1000000000 + "B";
      }
    })
    .tickSize(10, 0);
  const makeYLines = () => d3.axisLeft().scale(y);

  let x0 = d3.scaleBand().range([0, width]).padding(0.1);
  //setting up inner Y Scale (industries)
  let x1 = d3.scaleBand();
  let xAxis = d3.axisBottom(x0).tickSize(0);
  x0.domain(rounds);
  //sector domain fits within the round domain
  x1.domain(sectors).rangeRound([0, x0.bandwidth()]);
  x0.invert = function (x) {
    var domain = x0.domain();
    var range = x0.range();
    var scale = d3.scaleQuantize().range(domain).domain(range);
    return scale(x);
  };

  //year label
  let timeLabel = svg
    .append("text")
    .attr("class", "label")
    .attr("y", height + 20)
    .attr("x", width + 11)
    .attr("font-size", "40px")
    .attr("opacity", "0.4")
    .attr("text-anchor", "middle")
    .text("2000");

  const createSVGLayout = (svg) => {
    toggleDrilldown();

    //adding Y axis with the opacity of 0.
    svg.append("g").attr("class", "y axis").style("opacity", "0");
    //adding grid lines with the opacity of 0
    svg
      .append("g")
      .attr("class", "grid")
      .call(makeYLines().tickSize(-width, 0, 0).tickFormat(""))
      .style("opacity", "0");

    //adding label Value to the X axis
    svg
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("font-weight", "bold")
      .text("Value");

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
  };

  // transition
  const t = d3.transition().duration(750);

  createSVGLayout(svg);

  let interval;
  let barChartData;
  let drillDownData;

  //color scheme for the bar chart
  const color = d3.scaleOrdinal(d3.schemeSet1);

  let time = 0;

  // STREAMING DATA
  d3.json("./data/funding/new_funding.json").then(function (data) {
    //preping data for the bar chart
    barChartData = d3
      .nest()
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
      .entries(data);

    // preping data for the drilldown horizontal bar chart
    drillDownData = d3
      .nest()
      .key(function (d) {
        return d.funded;
      })
      .sortKeys(d3.ascending)
      .key(function (d) {
        return d.sector;
      })

      .entries(data);

    //drawing Legend
    drawLegend();

    // First run of the bar chart visualization
    update(barChartData[0]);
  });

  const drawLegend = () => {
    const legendHolder = svg.append("g").attr("class", "legend-container");

    let dataL = 0;
    const offset = 90;
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

    legend
      .append("rect")
      .attr("x", -40)

      .attr("y", height + 40)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", function (d, i) {
        return color(d);
      });
    legend
      .append("text")
      .attr("x", -25)
      .attr("y", height + 48)
      .text(function (d, i) {
        if (d === "ecommerce") return "eCom";
        return d;
      })
      .attr("class", "textselected")
      .style("text-anchor", "start")
      .style("font-size", 16);
  };

  const update = (data) => {
    if (data == undefined) {
      return;
    }

    // dynamically defining y domain
    y.domain([
      0,
      d3.max(data.values, function (rounds) {
        return d3.max(rounds.values, function (d) {
          if (d3.select("#industry-select").node().value !== "all") {
            let selected = d3.select("#industry-select").node().value;
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

    //changing Y axis opacity to 1
    svg
      .selectAll("g.y.axis")
      .transition()
      .duration(1000)
      .delay(300)
      .style("opacity", "1")
      .call(yAxis);

    // styling y and x axises
    svg.selectAll("g.y.axis text").style("font-size", 15);
    svg.selectAll("g.x.axis text").style("font-size", 18);

    //chaging grid opacity to 1
    svg
      .selectAll(".grid")
      .transition()
      .duration(1000)
      .delay(300)
      .style("opacity", "1")
      .call(makeYLines);

    // creating a "slice" of a bar chart
    let slice = svg
      .selectAll(".slice")
      .data(data.values)
      .enter()
      .append("g")
      .attr("class", "g")
      .attr("transform", function (d) {
        return "translate(" + x0(d.key) + ",0)";
      });

    //entering rects
    let rects = slice
      .selectAll("rect")
      .data(function (d) {
        return d.values.filter(function (d) {
          if (d3.select("#industry-select").node().value == "all") {
            return d;
          } else {
            return d.key == d3.select("#industry-select").node().value;
          }
        });
      })
      .enter()
      .append("g");

    //removing previous bar chart group
    svg
      .selectAll("rect.current")

      // rect transition
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

    //appending new rectangles
    rects
      .append("rect")
      .attr("class", "current")
      .attr("width", x1.bandwidth)
      .attr("x", function (d) {
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
          parseSvg(d3.select(this.parentNode.parentNode).attr("transform"))
            .translateX
        );
        //calling this function to drillDown on a specific industry when clicked
        handleDrillDown(d, round, drillDownData, time);
      })
      .attr("cursor", "pointer")
      .on("mouseenter", function (d, i) {
        const line = svg
          .append("line")
          .attr("id", "limit")
          .attr("x1", 0)
          .attr("y1", y(d.value))
          .attr("x2", width)
          .attr("y2", y(d.value));
      })
      .on("mouseover", function (d) {
        d3.select(this).style("fill", d3.rgb(color(d.key)).darker(2));
      })
      .on("mouseout", function (d) {
        d3.select(this).style("fill", color(d.key));
      })
      .on("mouseleave", function () {
        svg.selectAll("#limit").remove();
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
      .transition(t)
      .delay(function (d) {
        return Math.random() * 1000;
      })
      .attr("y", function (d) {
        return y(d.value);
      })
      .attr("height", function (d) {
        return height - y(d.value);
      });

    //increment timeLabel
    timeLabel.text(+(time + 2000));

    document.getElementById("year").innerHTML = +(time + 2000);

    $("#date-slider").slider("value", +(time + 2000));
  };

  //BUTTON EVENT LISTENERS

  document.getElementById("play-button").addEventListener("click", (event) => {
    if (event.target.textContent == "Play") {
      event.target.textContent = "Pause";
      interval = setInterval(step, 3000);
      step();
    } else {
      event.target.textContent = "Play";
      clearInterval(interval);
    }
  });

  // function to step our animation
  const step = () => {
    // At the end of our data, loop back
    time = time < 14 ? time + 1 : 0;
    update(barChartData[time]);
  };

  document.getElementById("reset-button").addEventListener("click", () => {
    time = 0;
    update(barChartData[time]);
  });
  document.getElementById("goback-button").addEventListener("click", () => {
    restore();
  });

  // restore animation page from the drilldown

  const restore = () => {
    d3.selectAll("svg").remove();

    toggleMainPage();

    svg = d3
      .select("#inter")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    timeLabel = svg
      .append("text")
      .attr("class", "label")
      .attr("y", height + 20)
      .attr("x", width + 10)
      .attr("text-anchor", "middle")
      .text(`${time + 2000}`);

    const duration = 750;
    const transition1 = d3.transition().duration(duration);
    const transition2 = transition1.transition();

    const exit = svg.selectAll(".enter").attr("class", "exit");
    exit.selectAll("text").remove();

    // Transition exiting bars to fade out.
    exit
      .selectAll("rects")
      .transition(transition2)
      .attr("transform", (d, i) => `translate(${-barStep * i + 20}, 0)`)
      .remove();

    d3.selectAll("g.y-axis").remove();

    d3.selectAll("g.x-axis").remove();
    createSVGLayout(svg);
    drawLegend();

    update(barChartData[time]);
  };

  //dropdown selection
  d3.select("#industry-select").on("change", function () {
    if (d3.select("#play-button").text() === "Pause") {
      const current = time;
      d3.selectAll("rect.current").interrupt();
      clearInterval(interval);
      interval = setInterval(step, 3000);
      step(barChartData[current]);
    } else {
      update(barChartData[time]);
    }
  });

  //slider element
  $("#date-slider").slider({
    max: 2013,
    min: 2000,
    step: 1,
    animate: "slow",
    slide: function (event, ui) {
      time = ui.value - 2000;
      update(barChartData[time]);
    },
  });
};
