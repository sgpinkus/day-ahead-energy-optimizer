import * as d3 from 'd3';

export type Options = {
  margin: Record<string, any>;
  range: [number | undefined, number | undefined],
  xFormatter: any,
};

const defaultOptions: Options = {
  margin: { top: 20, right: 20, bottom: 40, left: 40},
  range: [undefined, undefined],
  xFormatter: null,
};

function getRange(data: number[]) {
  return [Math.min(...data), Math.max(...data)];
}

export function draw(container: SVGSVGElement, data: number[], _options: Partial<Options> = {}) {
  const options: Options = { ...defaultOptions, ..._options };
  const svg = d3.select(container);
  const g = svg.append('g')
      .attr('transform', `translate(${options.margin.left}, ${options.margin.top})`);
  const width = svg.node()!.width.animVal.value - options.margin.left - options.margin.right;
  const height = svg.node()!.height.animVal.value - options.margin.top - options.margin.bottom;
  const xScale = d3.scaleBand<number>().rangeRound([0, width]).padding(0.1).domain(Object.keys(data).map(i => +i));
  const yScale = d3.scaleLinear().rangeRound([height, 0]).domain(getRange(data));
  g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickFormat(options.xFormatter));
  g.selectAll('.axis--x g.tick text')
      .attr('transform', 'rotate(-90) translate(-20,-14)');
  g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(yScale).ticks(10, ''));
  g.append('line')
    .attr('stroke', 'black')
    .attr('x1', 0)
    .attr('x2', width)
    .attr('y1', yScale(0))
    .attr('y2', yScale(0));
  console.log(data);
  // g.append('path')
  //   .datum(data)
  //   .attr('fill', 'none')
  //   .attr('stroke', 'steelblue')
  //   .attr('stroke-width', 1.5)
  //   .attr('d', d3.line());
  //     // .x(function(d) { return x(data); })
  //     // .y(function(d) { return y(d.value); })
  //     // );
  svg.append('path').attr('d', d3.line(Object.entries(data))).attr('stroke', 'currentColor');
}