
import React from "react";
import Concordances from '../concordances/concordances.jsx';
import Search from '../search/search.jsx';

import data from '../../../data/data.json';
import config from '../../../data/config.json';

import './normalize.css';
import './app.css';

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

  updateQuery(newQuery) {
    config.query = newQuery;
    this.setState({config : config});
  }

  render() {
    return (
      <div>
        <Search updated={this.updateQuery.bind(this)} search={this.state.config.query} />
        <Concordances data={this.state.data} query={this.state.config.query} config={this.state.config} />
      </div>
    );
  }
};
