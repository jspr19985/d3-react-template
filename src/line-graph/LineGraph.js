import React, { Component } from 'react';
import * as d3Line from 'd3-shape';
import { select, scaleLinear, scaleTime, axisBottom, axisLeft, max, min } from 'd3';
import { returnMargin } from "../generic/margins";
import '../App.css';
import { getData } from "./getData";
import { addYAxisText, addXAxisText } from "./axis";
import { xAxisTextParam, yAxisTextParam, marginData } from "./parameters";
const { width, height, left, top } = returnMargin(marginData);
const graphData = getData();

export default class LineGraph extends Component {

  constructor(props) {
    super(props);
    this.createGraph = this.createGraph.bind(this);
  }

  componentDidMount() {
    this.createGraph(graphData);
  };

  createGraph(data) {
    const node = this.node;
    const time = data.map(data => new Date(data.x));
    const values = data.map(data => new Date(data.y));
    const x = scaleTime().domain([min(time), max(time)]).range([0, width]),
          y = scaleLinear().domain([0, max(values)]).range([height, 0]);

    const xAxis = axisBottom().scale(x).ticks(graphData.length -1), 
          yAxis = axisLeft().scale(y);   

    // Append x-axis
    select(node).append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + (left) + "," + (height + 13) + ")  ")
      .call(xAxis);
      
    // Append y-axis  
    select(node).append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + left + "," + (top + 10) + ")") 
      .call(yAxis);
      
    // Line 
    const line = d3Line.line()
      .x(function(d) { return x(new Date(d.x)) + left; })
      .y(function (d) { return y(d.y); });

    select(node).append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#0B575B")
      .attr("d", line);
      
    addXAxisText(node, xAxisTextParam);
    addYAxisText(node, yAxisTextParam);
 
  }

  render() {
      return (
      <div className="center">
        <h1 className="margin-top-medium">Line Graph</h1>
        <div>
          <svg ref={node => this.node = node} width={420} height={220}  id="svg-line" className="centerGraph"></svg> 
        </div>            
      </div>
    );
  }
}