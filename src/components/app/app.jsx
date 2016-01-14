
import React from "react";
import Concordances from '../concordances/concordances.jsx';
import Search from '../search/search.jsx';

import data from '../../../data/data.json';
import config from '../../../data/config.json';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      config: {}
    };
  }

  componentDidMount() {
    this.setState({data : data,
                   config: config
                 });
  }

  updateMatch(newMatch) {
    config.match = newMatch;
    this.setState({config : config});
  }

  render() {
    return (
      <div>
        <Search updated={this.updateMatch.bind(this)} search={this.state.config.match} />
        <Concordances data={this.state.data} match={this.state.config.match} config={this.state.config} />
      </div>
    );
  }
};
