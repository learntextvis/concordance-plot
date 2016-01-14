import React from 'react';

import './search.css';

export default class Search extends React.Component {

  onChange(evt) {
    this.props.updated(evt.target.value);
  }

  render() {
    return (
      <div className='search'>
        <input type='text' value={this.props.search} onChange={this.onChange.bind(this)} />
      </div>
    );
  }
}

Search.propTypes = {
  updated: React.PropTypes.func.isRequired,
  search: React.PropTypes.string
};

Search.defaultProps = {
  search: ""
};
