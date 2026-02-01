import * as d3 from 'd3';
const { PI, cos, sin, sqrt } = Math;

export type Node = {
  title?: string,
  id: string,
  type: string,
  description?: string,
  color?: string,
  shape?: string,
}
const rimNodeDefaults = {
  color: 'blue',
  shape: 'circle',
  title: 'Node',
};
const hubNodeDefaults = {
  color: 'lightblue',
  shape: 'circle',
  title: 'Bus',
};
export type Data = {
  hub: Node,
  nodes: Node[],
}

export function draw(
  container: SVGSVGElement,
  nodes: Node[],
  _hubNode: Node,
  focusedNodeId: string | number = -1,
  margin: Record<string, any> = { top: 40, right: 40, bottom: 40, left: 40 },
  click?: (id: string, index: number) => void,
  dblclick?: (id: string, index: number) => void,
) {
  function nodeEffects(nodes: d3.Selection<SVGGElement, Node, any, any>) {
    nodes.on('mouseover', function () {
      d3.select(this).attr('opacity', '.50');
      d3.select(this).select('.tool-tip').attr('opacity', 1);
    })
      .on('mouseout', function () {
        d3.select(this).attr('opacity', '1');
        d3.select(this).select('.tool-tip').attr('opacity', 0);
      })
      .on('click', function (_e, d) {
        const i = Number(index.get(this));
        if (click) click(d.id, i);
      })
      .on('dblclick', function (_e, d) {
        const i = Number(index.get(this));
        if (dblclick) dblclick(d.id, i);
      });
  }

  const index = d3.local<number>();
  const svg = d3.select(container);
  const width = svg.node()!.width.animVal.value - margin.left - margin.right;
  const height = svg.node()!.height.animVal.value - margin.top - margin.bottom;
  const nodeR = width / 12;
  const r = width / 2 - nodeR / 2;
  const x = (i: number) => r * cos(rScale(i) + PI / 6);
  const y = (i: number) => r * sin(rScale(i) + PI / 6);
  const m = (i: number) => sqrt(x(i) ** 2 + y(i) ** 2);
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  const rScale = d3.scaleLinear().range([0, 2 * PI]).domain([0, nodes.length]);
  const hub = g.append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);
  const rimNodes = hub.selectAll('.rim-node').data(nodes).enter().append('g')
    .attr('transform', (_d, i) => `translate(${x(i)}, ${y(i)})`)
    .each(function (_d, i) { index.set(this, i + 1); })
    .classed('node', true)
    .classed('focused-node', function (d) { return [d.id, Number(index.get(this))].includes(focusedNodeId as any); });
  rimNodes.exit().remove();
  rimNodes.append('line')
    .attr('x1', (_d, i) => -1 * (nodeR) / m(i) * x(i))
    .attr('y1', (_d, i) => -1 * (nodeR) / m(i) * y(i))
    .attr('x2', (_d, i) => -1 * ((m(i) - nodeR) / m(i)) * x(i))
    .attr('y2', (_d, i) => -1 * ((m(i) - nodeR) / m(i)) * y(i))
    .attr('stroke', 'yellow');
  rimNodes.append('circle')
    .attr('r', nodeR)
    .attr('fill', (d) => d.color || rimNodeDefaults.color)
    .attr('stroke', 'yellow');
  rimNodes.append('text')
    .text((d) => d.title || null)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('textLength', function (_d, i, g) {
      return Math.min(g[i]?.getComputedTextLength() || -1, 2.5 * nodeR);
    })
    .attr('lengthAdjust', 'spacingAndGlyphs');
  rimNodes.append('text').text((d) => d.description || '')
    .attr('class', 'tool-tip')
    .attr('opacity', '0')
    .attr('y', -nodeR);
  nodeEffects(rimNodes);
  const hubNode = hub.selectAll('.hub-node').data([_hubNode]).enter().append('g');
  hubNode.classed('node', true)
    .classed('hub-node', true)
    .each(function () { index.set(this, 0); })
    .classed('focused-node', function (d) { return [0, d.id].includes(focusedNodeId as any); });
  hubNode.append('circle')
    .classed('node', true)
    .attr('r', nodeR)
    .attr('fill', (d) => d.color || hubNodeDefaults.color)
    .attr('stroke', 'yellow');
  hubNode.append('text')
    .text((d) => d.title ?? hubNodeDefaults.title)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle');
  nodeEffects(hubNode);
}
