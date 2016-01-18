import React from 'react';
import Concordance from '../../chart/concordance';
import KeywordInContext from 'keyword-in-context';

import './concordance.css';

 export default class ConcordanceComponent extends React.Component {

  componentDidMount() {
    this.chart = new Concordance({
      container: this.refs.plot,
      width: 600,
      height: 80
    });

    this.chart.initialRender();
    this.chart.update(this.props.data, this.props.config, this.props.allData);
    this.chart.render(this.props.query);

  }

  componentDidUpdate() {
    this.chart.update(this.props.data, this.props.config, this.props.allData);
    this.chart.render(this.props.query);
  }

  render() {
    return (
      <div>
        <div className='concordance'>
          <p className='concordance-title'>{this.props.data.name}</p>
          <div ref='plot' className="concordance-plot"></div>
        </div>
        <div className='kwik'>
          <KeywordInContext text={this.props.data.text} query={this.props.query} contextSize={30} caseSensitive={true} />
        </div>
      </div>
    );
  }
}

ConcordanceComponent.propTypes = {
  config: React.PropTypes.object.isRequired,
  // Text to search for
  query: React.PropTypes.string.isRequired,
  // lengths of the other texts
  allData: React.PropTypes.array,
  // data object
  data: React.PropTypes.object.isRequired
};
