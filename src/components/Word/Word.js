import React, { Component } from 'react';
import './Word.css';

export default class Word extends Component {
  static defaultProps = {
    data: null,
  };


  render() {
    return (
      <div className="Word">
        <h4>{this.props.data.original}</h4>
        <p>Translation: {this.props.data.translation}</p>
        <p>incorrect answer count: {this.props.data.incorrect_count}</p>
        <p>correct answer count: {this.props.data.correct_count}</p>
      </div>
    )
  };
};


