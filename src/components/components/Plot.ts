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

export function draw(
  container: SVGSVGElement,
  data: Record<string | number, number>,
  _options: Partial<Options> = {}
) {
  const domain: number[] = Object.keys(data).map(v => +v);
  const options: Options = { ...defaultOptions, ..._options };
  const svg = d3.select(container);
  const g = svg.append('g')
      .attr('transform', `translate(${options.margin.left}, ${options.margin.top})`);
  const width = svg.node()!.width.animVal.value - options.margin.left - options.margin.right;
  const height = svg.node()!.height.animVal.value - options.margin.top - options.margin.bottom;
  const x = d3.scaleLinear().range([0, width]).domain(d3.extent(domain) as number[]);
  const y = d3.scaleLinear().rangeRound([height, 0]).domain(getRange(Object.values(data)));
  g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickFormat(options.xFormatter));
  g.selectAll('.axis--x g.tick text')
      .attr('transform', 'rotate(-90) translate(-20,-14)');
  g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10, ''));
  g.append('line')
    .attr('stroke', 'black')
    .attr('x1', 0)
    .attr('x2', width)
    .attr('y1', y(0))
    .attr('y2', y(0));
  g.append('path')
    .datum(domain)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 1.5)
    .attr('d', (d3.line() as any)
      .x((d: number) => x(d))
      .y((d: any) => y(data[d]))
    );
}