import d3 from 'd3';

import './concordance.css';

export default class Concordance {
  constructor(opts) {
    this.opts = opts;
    this._container = opts.container;;
    this.container = d3.select(this._container);

    this.width = this.opts.width;
    this.height = this.opts.height;
  }

  update(data, config) {
    this.data = data.tokens.map(function(w, i) { return {token:w, index:i}; });

    this.updateScales(this.data, config);
  }

  updateScales(data) {
    this.xScale = d3.scale.linear().domain([0, data.length])
      .range([0, this.width]);
  }

  initialRender() {

    var svg = this.container.append('svg')
      .attr('class', 'concordance')
      .attr('width', this.width)
      .attr('height', this.height);

    var g = svg.append('g')
      .attr('class', 'concordance-lines');

    g.append('rect')
      .attr('class', 'concordance-background')
      .attr('width', this.width)
      .attr('height', this.height);
  }

  render(searchTerm) {
    var that = this;
    var g = this.container.select('svg').selectAll('.concordance-lines');

    var selectedWords = this.data
      .filter(function(d) { return d.token === searchTerm; });

    var word = g.selectAll('.concordance-line')
      .data(selectedWords, function(w) { return w.index; });


    // ENTER
    word.enter().append('line')
      .attr('class', 'concordance-line');

    // ENTER & UPDATE
    word.attr("x1", function(d) { return that.xScale(d.index); })
      .attr("x2", function(d) { return that.xScale(d.index); })
      .attr("y1", 2)
      .attr("y2", this.height - 2)
      .attr("stroke-width", 1);

    // EXIT
    word.exit()
      .remove();
  }
}
