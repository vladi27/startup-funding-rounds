d3.selection.prototype.toggle = function () {
  var isHidden = this.style("display") == "none";
  return this.style("display", isHidden ? "inherit" : "none");
};

export const toggleDrilldown = () => {
  d3.select("#goback-button").toggle(); //hide go-back button
  d3.select("#drilldown-container").toggle(); //toggle drilldown container
};

export const toggleMainPage = () => {
  d3.select("#paragraph").toggle();
  d3.select("#play-button").toggle();
  // d3.select("#reset-button").style("opacity", "0");
  d3.select("#reset-button").toggle();
  // d3.select("#slider-div").style("opacity", "0");
  d3.select("#slider-div").toggle();
  // d3.select("#industry-select").style("opacity", "0");
  d3.select("#industry-select").toggle();
  // d3.select("#year").style("opacity", "0");
  d3.select("#year").toggle();
};
