import * as d3 from 'd3';
import { RunSpec } from '@/model/RunSpec';
// import { scaleBand, scaleLinear, select, axisBottom, selectAll  }  from 'd3';

export type Options = {
  margin: Record<string, any>;
  range: [number | undefined, number | undefined],
  autoPaddingFactor: [number, number],
  xFormatter: any,
  precision: number,
}

const defaultOptions: Options = {
  margin: { top: 20, right: 20, bottom: 40, left: 40},
  range: [undefined, undefined],
  autoPaddingFactor: [0.15, 0.15],
  xFormatter: null,
  precision: 3,
};

type Range = [number, [number, number]];


/**
 * Draw data and set up graph based on data. data must be an array of numbers.
 * If range use that for y-axis range.
 */
export function draw(container: SVGSVGElement, data: RunSpec<number>, changed = () => {}, _options: Partial<Options> = {}) {

  function vStarted(this: Element, event: DragEvent) {
    console.log('v drag started');
    drawLine(event.y);
  }

  function vDragged(this: Element, event: DragEvent, datum: Range) {
    const [v, range] = datum;
    const value = -event.y;
    const domainValue = Number(Number(yScale.invert(yScale(0) - value)).toPrecision(options.precision));
    console.debug(`
    data=${datum},
    yPos(datum)=${yScale(v)}
    yPos(0)=${yScale(0)}
    height=${height}
    event.y=${event.y}
    newValue=${value}
    newDomainValue=${domainValue}`);
    drawLine(event.y);
    data.set(range[0], domainValue);
    // Ideally just this setTimeout(_barGroups, 0) but it doesn't work ...
    d3.select(this)
      .selectAll('.bar')
      .attr('height', Math.abs(value))
      .attr('transform', () => `scale(1, ${-1 * Math.sign(value)})`)
      .classed('bar-active', true);
  }

  function vStopped() {
    console.log('v drag stopped');
    lineGroup.attr('opacity', 0);
    changed();
  }

  function hStarted(this: Element, event: DragEvent, [v, range]: Range) {
    selectedIndex = scaleBandInvert(xScale)(xScale(range[0])! + event.x);
    console.log('h drag started at', selectedIndex);
  }

  function hStopped(this: Element, event: DragEvent, [v, range]: Range) {
    const newStartIndex = scaleBandInvert(xScale)(xScale(range[0])! + event.x);
    if(selectedIndex !== undefined && newStartIndex !== undefined) {
      data.move(selectedIndex, newStartIndex);
    }
    console.log('h drag stopped', selectedIndex, newStartIndex);
    changed();
  }

  function getRange() {
    const [min, max] = [Math.min(...data.toArray()), Math.max(...data.toArray())];
    const spread = max - min;
    function _min() {
      if(options.range && options.range[0] !== undefined) return options.range[0];
      if(spread) return min - options.autoPaddingFactor[0] * spread;
      else if(min !== 0) {
        return (min < 0) ? min + options.autoPaddingFactor[0] * min : 0;
      }
      return -1;
    }
    function _max() {
      if(options.range && options.range[1] !== undefined) return options.range[1];
      if(spread) return max + options.autoPaddingFactor[1] * spread;
      else if(max !== 0) {
        return (max < 0) ? 0 : max + options.autoPaddingFactor[1] * max;
      }
      return 1;
    }
    return [_min(), _max()];
  }

  function drawLine(eventY: number) {
    lineGroup
      .attr('opacity', 1)
      .attr('transform', `translate(0, ${yScale(0) + eventY})`)
      .select('text')
        .text(d3.format(`.${options.precision}f`)(yScale.invert(yScale(0) + eventY)));
  }

  const options: Options = { ...defaultOptions, ..._options };
  const index = d3.local<number>();
  const svg = d3.select(container);
  const width = svg.node()!.width.animVal.value - options.margin.left - options.margin.right;
  const height = svg.node()!.height.animVal.value - options.margin.top - options.margin.bottom;
  const xScale = d3.scaleBand<number>().rangeRound([0, width]).padding(0.1).domain(Object.keys(data.toArray()).map(i => +i));
  const yScale = d3.scaleLinear().rangeRound([height, 0]).domain(getRange());
  let selectedIndex: number | undefined = undefined;
  const g = svg.append('g')
      .attr('transform', `translate(${options.margin.left}, ${options.margin.top})`);
  const dragV = d3.drag<SVGGElement, [number, [number, number]]>();
  const dragH = d3.drag<SVGRectElement, [number, [number, number]]>();
  const barGroups = g.selectAll('.bar-group').data(data.toRanges()).enter().append('g')
    .attr('transform', ([v, range]) => `translate(${xScale(range[0])}, ${yScale(0)})`);
  const bars = barGroups
    .append('g')
      .each(function(d, i) { index.set(this, i); })
      .attr('class', function() { return `bar-${index.get(this)}`; })
      .call(dragV.on('start', vStarted))
      .call(dragV.on('drag', vDragged))
      .call(dragV.on('end', vStopped));
  barGroups.exit().remove();
  bars.append('rect')
    .classed('bar', true)
    .attr('width', ([v, range]) => xScale(range[1])! - xScale(range[0])! + xScale.bandwidth() + xScale.paddingOuter()*2)
    .attr('height',  ([v, range]) => Math.abs(yScale(0) - yScale(v)) + 1)
    .attr('transform', ([v, range]) => `scale(1, ${-1 * Math.sign(yScale(0) - yScale(v) || 1)})`)
    .attr('stroke', 'yellow')
    .attr('stroke-width', 2)
    .attr('cursor', 'grabbing')
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
  bars.append('rect')
    .classed('bar', true)
    .attr('width', xScale.step()*0.8)
    .attr('height',  ([v, range]) => Math.abs(yScale(0) - yScale(v)) - 1)
    .attr('transform', ([v, range]) => `scale(1, ${-1 * Math.sign(yScale(0) - yScale(v))})`)
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
  const barTops = bars.append('g')
    .attr('transform', ([v, range]) => `translate(0, ${yScale(v) - yScale(0)})`);
  barTops.append('text')
    .text(([h, range]) => {
      const w = range[1] - range[0] + 1;
      const f = d3.format(`.${options.precision}f`);
      return `${h}x${w} = ${f(h*w)}`;
    })
    .attr('class', 'tool-tip')
    .attr('fill', 'black')
    .attr('stroke', 'black')
    .attr('opacity', '0');
  barTops.append('polygon')
    .attr('points', '0,0 30,0 15,15 0,0')
    .attr('transform', ([v, range]) => `translate(${(xScale(range[1])! - xScale(range[0])!)/2 - 15}, -7.5)`)
    .attr('fill', 'red')
    .attr('stroke', 'red')
    .attr('cursor', 'crosshair')
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
  // xy axes.
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

