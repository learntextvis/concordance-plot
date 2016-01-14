import React from "react";
import Concordance from '../concordance/concordance.jsx';


export default class Concordances extends React.Component {
  constructor() {
    super();
  }

  renderConcordance(d,i) {
    return (
      <Concordance
          key={i}
          config={this.props.config}
          match={this.props.match}
          data={d} />
    );
  }

  render() {
    return (
      <div>
        {this.props.data.map((d,i) => this.renderConcordance(d,i) )}
      </div>
    );
  }
};

Concordances.propTypes = {
  config: React.PropTypes.object.isRequired,
  // Text to search for
  match: React.PropTypes.string,
  // data object
  data: React.PropTypes.array.isRequired
};

Concordances.defaultProps = {
  match: ""
};
