import * as d3 from 'd3';
import type { RunSpec } from '@/model/RunSpec';
// import { scaleBand, scaleLinear, select, axisBottom, selectAll  }  from 'd3';

type Options = {
  margin: Record<string, any>;
  range?: [number | undefined, number | undefined],
  xFormatter: any,
  precision: number,
}

type Range = [number, [number, number]];

const defaultOptions: Options = {
  margin: { top: 20, right: 20, bottom: 40, left: 40},
  range: undefined,
  xFormatter: null,
  precision: 3,
};

/**
 * Draw data and set up graph based on data. data must be an array of numbers.
 * If range use that for y-axis range.
 */
export function draw(container: SVGSVGElement, data: RunSpec<number>, changed = () => {}, _options: Partial<Options> = {}) {

  console.log(data.toRanges());

  function vStarted(this: Element, event: DragEvent) {
    console.log('v drag started');
    drawLine(event.y);
  }

  function vDragged(this: Element, event: DragEvent, datum: Range) {
    const [v, range] = datum;
    const i = Number(index.get(this));
    console.log('v dragged', selectedIndex, i, scaleBandInvert(xPos)(xPos(i)! + event.x));
    const [value, domainValue] = yValues(event.y);
    drawLine(event.y);
    data.set(range[0], domainValue);
    // Ideally just this setTimeout(_barGroups, 0) but it doesn't work ...
    d3.select(this).attr('transform', `translate(${xPos(range[0])}, ${height - value})`)
      .selectAll('.bar')
        .attr('height', value);
  }

  function vStopped() {
    console.log('v drag stopped');
    lineGroup.attr('opacity', 0);
    changed();
  }

  function hStarted(this: Element, event: DragEvent, [v, range]: Range) {
    selectedIndex = scaleBandInvert(xPos)(xPos(range[0])! + event.x);
    console.log('h drag started at', selectedIndex);
  }

  function hStopped(this: Element, event: DragEvent, [v, range]: Range) {
    const newStartIndex = scaleBandInvert(xPos)(xPos(range[0])! + event.x);
    if(selectedIndex !== undefined && newStartIndex !== undefined) {
      data.move(selectedIndex, newStartIndex);
    }
    console.log('h drag stopped', selectedIndex, newStartIndex);
    changed();
  }

  function getRange() {
    const a = data.toArray();
    const rangeMin = options.range && options.range[0];
    const rangeMax = options.range && options.range[1];
    const [min, max] = [rangeMin ?? Math.min(...a), rangeMax ?? Math.max(...a)];
    const spread = max - min;
    const minSpread = rangeMin !== undefined ? 0 : 0.1 * spread;
    const maxSpread = rangeMax !== undefined ? 0 : 0.5 * spread;
    return [min - minSpread, max + maxSpread];
  }

  function yValues(y: number) {
    const value = height - y;
    const domainValue = Math.round(yPos.invert(y)*10**options.precision)/10**options.precision;
    return [value, domainValue];
  }

  function drawLine(y: number) {
    lineGroup
      .attr('opacity', 1)
      .attr('transform', `translate(0, ${y})`)
      .select('text')
        .text(d3.format(`.${options.precision}f`)(yPos.invert(y)));
  }

  const options: Options = { ...defaultOptions, ..._options };
  const index = d3.local<number>();
  const svg = d3.select(container);
  const width = svg.node()!.width.animVal.value - options.margin.left - options.margin.right;
  const height = svg.node()!.height.animVal.value - options.margin.top - options.margin.bottom;
  const xPos = d3.scaleBand<number>().rangeRound([0, width]).padding(0.1).domain(Object.keys(data.toArray()).map(i => +i));
  const yPos = d3.scaleLinear().rangeRound([height, 0]).domain(getRange());
  let selectedIndex: number | undefined = undefined;
  const g = svg.append('g')
      .attr('transform', `translate(${options.margin.left}, ${options.margin.top})`);
  g.append('g') // y position in g is proportional to data values.
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xPos).tickFormat(options.xFormatter));
  g.selectAll('.axis--x g.tick text')
      .attr('transform', 'rotate(-90) translate(-20,-14)');
  g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(yPos).ticks(10, ''));
  const dragV = d3.drag<SVGGElement, [number, [number, number]]>();
  const dragH = d3.drag<SVGRectElement, [number, [number, number]]>();
  _barGroups();

  function _barGroups() {
    const barGroups = g.selectAll('.bar').data(data.toRanges(), (d) => JSON.stringify(d));
    barGroups.join(
      // @ts-ignore
      (enter) => {
        const barGroup = enter.append('g')
          .attr('transform', ([v, range]) => `translate(${xPos(range[0])}, ${yPos(v)})`)
          .each(function(d, i) { index.set(this, i); })
          .attr('class', function() { return `bar-group-${index.get(this)}`; })
          .call(dragV.on('start', vStarted))
          .call(dragV.on('drag', vDragged))
          .call(dragV.on('end', vStopped));
        barGroup.append('rect')
          .classed('bar', true)
          .attr('width', ([v, range]) => xPos(range[1])! - xPos(range[0])! - xPos.paddingOuter()*2)
          .attr('stroke', 'yellow')
          .attr('cursor', 'grabbing')
          .attr('height', ([v, range]) => height - yPos(v))
          .on('mouseover', function () {
            d3.select(this).attr('opacity', '.50');
            d3.select(this.parentElement).select('.tool-tip')
              .attr('opacity', 1);
          })
          .on('mouseout', function() {
            d3.select(this).attr('opacity', '1');
            d3.select(this.parentElement).select('.tool-tip')
              .attr('opacity', 0);
          });
        barGroup.append('rect')
          .classed('bar', true)
          .attr('height', ([v, range]) => height - yPos(v) - 2)
          .attr('transform', 'translate(1,1)')
          .attr('width', xPos.step()*0.8)
          .attr('stroke', 'red')
          .attr('fill', 'red')
          .attr('cursor', 'grabbing')
          .call(dragH.on('start', hStarted))
          .call(dragH.on('end', hStopped))
          .on('mouseover', function () {
            d3.select(this).attr('opacity', '.50');
          })
          .on('mouseout', function() {
            d3.select(this).attr('opacity', '1');
          });
        barGroup.append('text')
          .text(([h, range]) => {
            const w = range[1] - range[0];
            const f = d3.format(`.${options.precision}f`);
            return `${h}x${w} = ${f(h*w)}`;
          })
          .attr('class', 'tool-tip')
          .attr('fill', 'black')
          .attr('stroke', 'black')
          .attr('opacity', '0');
        barGroup.append('polygon')
          .attr('points', '0,0 20,0 10,10 0,0')
          .attr('transform', ([v, range]) => `translate(${(xPos(range[1])! - xPos(range[0])!)/2 - 10}, 0)`)
          .attr('height', 20)
          .attr('width', 20)
          .attr('fill', 'red')
          .attr('stroke', 'red')
          .attr('cursor', 'crosshairs')
          .attr('opacity', 0)
          .on('mouseover', function () {
            d3.select(this).attr('opacity', '1');
          })
          .on('mouseout', function() {
            d3.select(this).attr('opacity', '0');
          })
          .on('mousedown', function(e: Event) {
            console.log(e, index.get(this));
            data.split(index.get(this)!);
            e.stopPropagation();
            changed();
          });
    });
  }

  const lineGroup = g.append('g')
    .attr('opacity', 0);
  lineGroup.append('line')
    .attr('class', 'line')
    .attr('stroke', 'black')
    .attr('x1', 0)
    .attr('x2', width)
    .attr('y1', 0)
    .attr('y2', 0);
  lineGroup.append('text')
    .text('')
    .attr('class', 'text')
    .attr('x', 0)
    .attr('y', 0)
    .attr('fill', 'black');
}

function scaleBandInvert(scale: any) {
  const domain = scale.domain();
  const paddingOuter = scale(domain[0]);
  const eachBand = scale.step();
  return function (value: any) {
    const index = Math.floor(((value - paddingOuter) / eachBand));
    return domain[Math.max(-100,Math.min(index, domain.length-1))];
  };
}

