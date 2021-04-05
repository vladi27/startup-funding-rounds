import { toggleDrilldown, toggleMainPage } from "./toggle";

const barStep = 22;
const barPadding = 3 / barStep;

const tip = d3
  .tip()
  .attr("class", "d3-tip")
  .direction("e") // Position the tooltip to the right of a target element
  .offset([-10, 0])
  .html(function (d) {
    let text =
      "Company:<span style='color:red'>" + " " + d.company + "</span><br>";
    text +=
      "Sector:<span style='color:red;text-transform:capitalize'>" +
      " " +
      d.sector +
      "</span><br>";
    text += "Round:<span style='color:red'>" + " " + d.round + "</span><br>";
    text +=
      "Amount Raised:<span style='color:red'>" +
      " " +
      d3.format("$,.0f")(d.amountRaised) +
      "</span><br>";
    return text;
  });

export const handleDrillDown = (d, round, drillDownData, time) => {
  const currentPeriodData = drillDownData[time];
  const duration = 700;
  const transition1 = d3.transition().duration(duration);
  const transition2 = transition1.transition();
  const transition3 = d3.transition().duration(750);

  const color = d3.scaleOrdinal(d3.schemeSet1);

  const filteredIndustryData = currentPeriodData.values.filter((ele) => {
    if (ele.key === d.key) {
      return ele;
    }
  });

  const filteredRoundData = filteredIndustryData[0].values.filter((ele) => {
    if (ele.round === round) {
      return ele;
    }
  });

  const sortedTopTenCompanies = filteredRoundData
    .slice()
    .sort((a, b) => d3.descending(a.amountRaised, b.amountRaised))
    .slice(0, 10);

  d3.selectAll("#inter svg").remove();

  toggleMainPage();
  toggleDrilldown();

  const drillSvg = d3
    .select("#svg-container")
    .append("svg")
    .attr("width", 1200)
    .attr("height", 600);

  const svg = d3.selectAll("svg");

  const margin = { top: 30, right: 20, bottom: 60, left: 15 };
  const width = +svg.attr("width") / 2.25 - margin.left - margin.right;
  const height = +svg.attr("height") / 1 - margin.top - margin.bottom;

  const gContainer = svg.append("g").attr("transform", "translate(0, 30)");

  //append horizontal bar chart
  const g = gContainer
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  g.call(tip);

  //x axis range of the horizontal bar chart
  const x = d3.scaleLinear().range([margin.left, width - margin.right]);
  // x axis domain of the horizontal bar chart
  x.domain([0, sortedTopTenCompanies[0].amountRaised]);

  g.append("rect")
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .attr("width", width)
    .attr("height", height);

  const xAxis = (g) => {
    g.attr("class", "x-axis")
      .attr("transform", `translate(0 ,${margin.top})`)
      .call(d3.axisTop(x).ticks(width / 150, "s"))
      .call((g) =>
        (g.selection ? g.selection() : g).select(".domain").remove()
      );
  };

  const yAxis = (g) =>
    g
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left + 0.5},0)`)
      .call((g) =>
        g
          .append("line")
          .attr("stroke", "currentColor")
          .attr("stroke-width", "3")
          .attr("y1", margin.top)
          .attr("y2", height + margin.top)
      );

  g.append("g").call(xAxis);

  g.append("g").call(yAxis);

  g.selectAll("g.x-axis text").style("font-size", 13);
  let industryPlaceholder = d.key;

  g.append("text")
    .attr("class", "title")
    .attr("x", width / 2)
    .attr("y", -30)
    .attr("text-anchor", "middle")
    .text(
      (d) =>
        `Biggest ${round} rounds in  ${industryPlaceholder} industry in ${
          time + 2000
        }`
    );

  const enter = bar(g, sortedTopTenCompanies, ".y-axis", x).attr(
    "fill-opacity",
    0
  );
  enter.transition(transition1).attr("fill-opacity", 1);

  // Transition entering bars to their new y-position.
  enter.selectAll("g").transition(transition1).attr("transform", stagger(x));

  // Update the x-axis.
  g.selectAll(".x-axis").transition().call(xAxis, width);

  // Transition entering bars to the new x-scale.
  enter
    .selectAll("g")
    .transition(transition2)
    .attr("transform", (d, i) => `translate(0,${barStep * i + 30})`);

  // Color the bars
  enter
    .selectAll("rect")
    .transition(transition3)
    .attr("fill", (d) => color(d.sector))
    .attr("fill-opacity", 1)
    .transition()
    .attr("fill", (d) => color(d.sector))
    .attr("width", (d) => x(d.amountRaised));

  const lineChartData = prepareLineChartData(d, round, drillDownData);

  buildLineChart(lineChartData, industryPlaceholder, round, time);
};

const bar = (group, data, selector, x) => {
  const g = group
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
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide);

  bar
    .append("text")
    .attr("x", 14)
    .attr("y", (27 * (1 - 0.1)) / 2)
    .attr("dy", ".35em")
    .text((d) => d.company.slice(0, 3).toUpperCase())
    .style("font-size", 12);

  bar
    .append("rect")
    .attr("x", x(0))
    .attr("class", "bar")
    .attr("width", function (d) {
      return x(d.amountRaised) - x(0);
    })
    .attr("height", 27 * (1 - 0.3));

  return g;
};

const stagger = (x) => {
  let value = 0;
  return (d, i) => {
    const t = `translate(${x(value)},${barStep * i + 50})`;
    value += d.amountRaised;
    return t;
  };
};

const prepareLineChartData = (d, round, drillDownData) => {
  const results = [];

  let i = 0;

  while (i < 14) {
    let obj = {};
    const currentPeriodData = drillDownData[i];

    const filteredIndustryData = currentPeriodData.values.filter((ele) => {
      if (ele.key === d.key) {
        return ele;
      }
    });

    if (filteredIndustryData[0] === undefined) {
      results.push({ y: 0 });
      i++;
      continue;
    }

    const filteredRoundData = filteredIndustryData[0].values.filter((ele) => {
      if (ele.round === round) {
        return ele;
      }
    });

    let sum = 0;

    filteredRoundData.forEach((ele) => {
      sum += ele.amountRaised;
    });
    obj["y"] = sum;
    results.push(obj);
    i++;
  }
  return results;
};

const buildLineChart = (lineChartData, placeholder, round, time) => {
  const svg = d3.select("svg");
  const margin = { top: 30, right: 60, bottom: 60, left: 25 };
  const width = +svg.attr("width") / 1.75 - margin.left - margin.right;
  const height = +svg.attr("height") - margin.top - margin.bottom;

  const sortedData = lineChartData
    .slice()
    .sort((a, b) => d3.descending(a.y, b.y));

  const xScale = d3.scaleLinear().domain([2000, 2013]).range([0, width]);
  const yScale = d3
    .scaleLinear()
    .domain([0, sortedData[0].y]) // input
    .range([height, 0]);

  let div = d3
    .select("body")
    .append("div") // declare the tooltip div
    .attr("class", "tooltip") // apply the 'tooltip' class
    .style("opacity", 0);

  let line = d3
    .line()
    .x(function (d, i) {
      return xScale(i + 2000);
    }) // set the x values for the line generator
    .y(function (d) {
      return yScale(d.y);
    }) // set the y values for the line generator
    .curve(d3.curveMonotoneX); // apply smoothing to the line

  const gContainer = svg
    .append("g")
    .attr("transform", "translate(560, 40)")
    .classed("yearly-container", true);

  const lineChart = gContainer
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  lineChart
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

  lineChart
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

  lineChart
    .append("path")
    .datum(lineChartData) // 10. Binds data to the line
    .attr("class", "line") // Assign a class for styling
    .attr("d", line);

  lineChart
    .selectAll(".dot")
    .data(lineChartData)
    .enter()
    .append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function (d, i) {
      return xScale(i + 2000);
    })
    .attr("cy", function (d) {
      return yScale(d.y);
    })
    //assigning radius to the dot
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
    //tool tip for the dot
    .on("mouseover", function (d, i) {
      div.transition().duration(200).style("opacity", 0.9);
      div
        .html(
          i +
            2000 +
            ": " +
            "<span style='color:red'>$" +
            d3.format(".2s")(d["y"]).replace(/G/, "B") +
            "</span>"
        )
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px")
        .style("background", "black");
    })
    .on("mouseout", function (d) {
      div.transition().duration(500).style("opacity", 0);
    });

  lineChart
    .append("text")
    .attr("class", "title")
    .attr("x", width / 2)
    .attr("y", -30)
    .attr("text-anchor", "middle")
    .text((d) => `Total $ raised per year, ${round}, ${placeholder} industry`);

  svg.selectAll("g.y.axis text").style("font-size", 15);
  svg.selectAll("g.x.axis text").style("font-size", 13);
};
