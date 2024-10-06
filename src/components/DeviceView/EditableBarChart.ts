import * as d3 from 'd3';
// import { scaleBand, scaleLinear, select, axisBottom, selectAll  }  from 'd3';

type Options = {
  margin: Record<string, any>;
  range: any,
  xFormatter: any,
}

const defaultOptions: Options = {
  margin: { top: 20, right: 20, bottom: 40, left: 40},
  range: null,
  xFormatter: null,
};

let dg;

/**
 * Presents a bar graph with mutable bars. The use can click on one bar and drag to change its
 * height and corresponding value. The user can click and drag to select >1 and simultaneously
 * change thier values.
 */
export default class EditableBarChart {
  options: Options;
  svg: d3.Selection<SVGSVGElement, null, null, any>;
  width: number;
  height: number;
  g: d3.Selection<SVGGElement, null, null, any>;
  selected: [number, number] = [-1, -1];
  xAxis: d3.ScaleBand<any> = d3.scaleBand();
  yAxis: d3.ScaleLinear<number, number, never> = d3.scaleLinear();

  /**
   * Init. We need to explicitly deal with margins ~because axes.
   */
  constructor(container: SVGSVGElement, options: Partial<Options> = {}) {
    this.options = { ...defaultOptions, ...options };
    this.svg = d3.select(container);
    this.width = +this.svg.attr('width') - this.options.margin.left - this.options.margin.right;
    this.height = +this.svg.attr('height') - this.options.margin.top - this.options.margin.bottom;
    this.g = this.svg.append('g')
        .attr('transform', 'translate(' + this.options.margin.left + ',' + this.options.margin.top + ')');
  }

  /**
   * Draw data and set up graph based on data. data must be an array of numbers.
   * If range use that for y-axis range.
   */
  draw(data: number[]) {
    this.selected = [-1,-1];
    const range = this.options.range ?? [Math.min(...data), Math.max(...data)];
    this.xAxis = d3.scaleBand<number>().rangeRound([0, this.width]).padding(0.1).domain(Object.keys(data).map(i => +i));
    this.yAxis = d3.scaleLinear().rangeRound([this.height,0]).domain(range);
    this.g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(d3.axisBottom(this.xAxis).tickFormat(this.options.xFormatter));
    this.g.selectAll('.axis--x g.tick text')
        .attr('transform', 'rotate(-90) translate(-20,-14)');
    this.g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(this.yAxis).ticks(10, ''));
    const dg = d3.drag<SVGRectElement, number>();
    const bars = this.g.selectAll('.bar').data(data).enter()
        .append('g')
        .attr('transform', (d,i) => { return 'translate(' +  this.xAxis(i) + ',0)'; });
    bars.append('rect')
        .attr('class', 'bar-bar')
        .attr('width', this.xAxis.bandwidth())
        .attr('transform', (d) => { return 'translate(0,' + this.yAxis(d) + ')'; })
        .attr('height',  (d) => { return this.height - this.yAxis(d); })
        .call(dg.on('start', (...args) => this.started(...args)))
        .call(dg.on('drag', (...args) => this.dragged(...args)))
        .call(dg.on('end', (...args) => this.stopped(...args)));
    bars.exit();
  }

  started(d: any, i: any, n?: any) {
    console.log('Drag started', d, i);
    this.selected[0] = this.selected[1] = i;
    d3.select(n[i]).classed('bar-active', true);
  }

  dragged(d: any, i: any, n?: any) {
    console.log('Drag', d, i);
    const mouse = d3.mouse(this.g.node());
    this.selected[1] = this.xi(mouse[0]);
    const target = d3.selectAll(n.slice.apply(n, this.selection()));
    d3.selectAll(n).classed('bar-active', false);
    target.attr('transform', 'translate(0,' + mouse[1] + ')')
        .attr('height', this.height - mouse[1])
        .classed('bar-active', true);
  }

  stopped(d: any, i: any, n?: any) {
    console.log('Drag stopped');
    d3.selectAll(n).classed('bar-active', false);
    this.selected = [-1,-1];
  }

  /**
   * Return current drag selection.
   */
  selection() {
    return [Math.min(this.selected[0], this.selected[1]), 1+Math.max(this.selected[0], this.selected[1])];
  }

  /**
   * Implements equiv of scaleBand().inverse() to map mouse pos to column.
   */
  xi(x: number) {
    if(x <= Number(this.xAxis(1))) {
      return 0;
    }
    for(let i = 2; i < this.xAxis.domain().length; i++) {
      if(x <= Number(this.xAxis(i))) {
        return i-1;
      }
    }
    return this.xAxis.domain().length-1;
  }
}
