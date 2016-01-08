import d3 from 'd3';

export default class Chart {
  constructor(opts) {
    this.opts = opts;
    this._container = opts.container;;
    this.container = d3.select(this._container);

    this.margins = {
      left: 50,
      right: 50,
      top: 50,
      bottom: 50
    };

    this.width = this._container.clientWidth;
    this.height = this._container.clientHeight;
  }

  update(data) {
    this.data = [data.value];

    this.radius = d3.scale.sqrt()
      .domain([0, 20])
      .range([1, this.width / 2]);
  }

  initialRender() {
    this.width = this._container.clientWidth;
    this.height = this._container.clientHeight;

    this.container.append('svg')
      .attr('height', this.height)
      .attr('width', this.width);
  }

  render() {
    var circle = this.container.select('svg').selectAll('circle')
      .data(this.data);

    circle.enter()
      .append('circle');

    circle
      .attr('cx', this.width / 2)
      .attr('cy', this.height / 2)
      .attr('r', (d) => this.radius(d) );
  }
}
