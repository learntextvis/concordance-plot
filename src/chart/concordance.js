import d3 from 'd3';

/**
  * Given a string and a query, will return a list of objects
  * that contain the index of where the query matches the string,
  * the math itself, and a string that represents the context in which
  * that match was found.
  *
  * @param  {String} source      the source string
  * @param  {String} query       the query string. this is currently
  *                              interpreted using regex syntax.
  * @param  {[type]} contextSize number of characters before and after the
  *                              match to capture as context.
  * @return {Object}             A concordance like object with index, match,
  *                              and context properties.
  */
 function findMatches(source, query, caseSensitive) {
   var qLen = query.length;

   if(qLen === 0) {
     return [];
   }

   // Set up search options
   var searchFlags = 'ig';
   if(caseSensitive) {
     searchFlags = 'g';
   }

   //
   // TODO: Escape special regex chars?
   var qReg = new RegExp(query, searchFlags);
   var matchIndices = [];
   var match;
   while(match = qReg.exec(source)) {
     matchIndices.push({"token":match[0], "index":qReg.lastIndex});
   }

   return matchIndices;
 }


export default class Concordance {
  constructor(opts) {
    this.opts = opts;
    this._container = opts.container;
    this.container = d3.select(this._container);

    this.width = this.opts.width;
    this.height = this.opts.height;

    // handle mouse click
    this.dispatch = d3.dispatch('select');
    this.dispatch.on('select.concordance', this.click.bind(this));
  }

  getTextLengths(data) {
    return data.map((d) => d.text.length);
  }

  update(data, config, allData) {
    this.data = [];

    this.data = data.text;

    this.updateScales(this.data, config, allData);
  }

  updateScales(data, config, allData) {
    var maxX = data.length;
    if(config.relativeSize) {
      var lengths = this.getTextLengths(allData);
      maxX = d3.max(lengths);
    }

    //TODO: this works - but would it be better
    // to use different ranges?
    this.xScale = d3.scale.linear().domain([0, maxX])
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

  mouseover() {
    d3.select(this)
      .classed("highlight", true);
  }

  mouseout() {
    d3.select(this)
      .classed("highlight", false);
  }

  click(token, index) {
    var g = this.container.select('.concordance-lines');
    g.selectAll('.concordance-line')
      .classed('active', function(e) { return e.index === index; });
  }

  render(searchTerm) {

    var matches = findMatches(this.data, searchTerm);

    var that = this;
    var g = this.container.select('svg').selectAll('.concordance-lines');

    var word = g.selectAll('.concordance-line')
      .data(matches, function(w) { return w.index; });

    g.select('.concordance-background')
      .attr('width', that.xScale(this.data.length));

    // ENTER
    word.enter().append('line')
      .attr('class', 'concordance-line');

    // ENTER & UPDATE
    word.attr("x1", function(d) { return that.xScale(d.index); })
      .attr("x2", function(d) { return that.xScale(d.index); })
      .attr("y1", 2)
      .attr("y2", this.height - 2)
      .attr("stroke-width", 1)
      .on("mouseover", that.mouseover)
      .on("mouseout", that.mouseout)
      .on("click", function(d) {
        that.dispatch.select(d.token, d.index, this);
      });

    // EXIT
    word.exit()
      .remove();
  }

  on(event, callback) {
    this.dispatch.on(event, callback);
  }
}
