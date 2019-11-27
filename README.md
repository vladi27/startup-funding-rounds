# Venture Funding Rounds (Data Visualization)

Check out the **[live app](https://vladi27.github.io/startup-funding-rounds/)**

**Venture Funding Rounds** is an interactive data visualization based off the Crunchbase 2013 snapshot. Approximately 400,000 data points spanning over 15 years were aggregated to give an exploratory visual of the venture funding rounds.

The visualization focuses on how venture activities have evolved since the Dot-com bubble and how different industries performed against each other competing for rounds of funding.

The visualization is segmented by four industries (Mobile,Software, Web, Ecommerce, Health Services) and five rounds of funding (Angel, series A, series B, Series C+ and Venture)

Data provided by [Crunchbase 2013 Snapshot](https://data.crunchbase.com/docs/2013-snapshot).

## Screenshots

![d3gif](https://user-images.githubusercontent.com/41927284/69699063-e1a6c600-109b-11ea-92db-0cc53d01591d.gif)

## Technologies

- D3.js
- JavaScript (ES6)
- Webpack
- Babel
- HTML5
- CSS3

## Features

- Users can interact with the visualization through playing an animation that displays yearly fundings across industries and rounds.
- Users can filter data by industry to visualize funding rounds for a specific category.
- Users can drilldown to any data point in the animation to see 10 biggest funding rounds for the specific industry, round and year.
- Users can visualize industry funding trends through the dynamically-generated line chart.

## Data Charts (D3.js)

D3 General Update Pattern (enter, update, exit) and D3 Data Joins were implemented for the visualization.

```javascript
rects
  .enter()
  .append("rect")
  .attr("width", x1.bandwidth)
  .attr("x", function(d) {
    return x1(d.key);
  })
  .attr("data-legend", function(d) {
    return d.key;
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
    drillDown(d, slice2, round);
  })
  .attr("cursor", "pointer")
  .on("mouseover", function(d) {
    d3.select(this).style("fill", d3.rgb(color(d.key)).darker(2));
  })
  .on("mouseout", function(d) {
    d3.select(this).style("fill", color(d.key));
  })
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

  .transition(t)
  .delay(function(d) {
    return Math.random() * 1000;
  })

  .attr("y", function(d) {
    return y(d.value);
  })
  .attr("height", function(d) {
    return height - y(d.value);
  });
```

Data is grouped and ordered through D3 nesting functionality that provides the underlying dataset with two-level nesting structure.

## Data (JSON)

Data was aggregated from Crunchbase and written into JSON by utilizing Node file system. The generated JSON file is loaded asynchronously into the D3 visualization.

```javascript
fs.readFile("./funding.json", "utf8", function(err, data) {
  if (err) {
    console.log(err);
  } else {
    const jsonArray = JSON.parse(data);

    let newJson2 = jsonArray.map(obj => {
      let newObj = {};
      if (
        obj.raised_amount_usd &&
        obj.funded_year > 1999 &&
        (obj.company_category_code === "mobile" ||
          obj.company_category_code === "web" ||
          obj.company_category_code === "software" ||
          obj.company_category_code === "ecommerce" ||
          obj.company_category_code === "medical") &&
        (obj.funding_round_type === "series-a" ||
          obj.funding_round_type === "series-c+" ||
          obj.funding_round_type === "angel" ||
          obj.funding_round_type === "series-b" ||
          obj.funding_round_type === "venture")
      ) {
        newObj = {
          amountRaised: obj.raised_amount_usd,
          round: obj.funding_round_type,
          company: obj.company_name,
          sector: obj.company_category_code,
          funded: obj.funded_year
        };
        return newObj;
      }
    });

    let newJson = newJson2.filter(obj => {
      return obj != null;
    });

    fs.writeFile(
      "./new_funding.json",
      JSON.stringify(newJson, null, 4),
      "utf8",
      function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("File has been created");
        }
      }
    );
  }
});
```

## Future Plans

- Add more industries and rounds
