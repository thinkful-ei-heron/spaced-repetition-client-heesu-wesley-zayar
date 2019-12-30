import React, { Component } from 'react'

export default class Word extends Component {
  static defaultProps = {
    data: null,

  }


  render() {
    return (
      <div className="Word">
        <p>{this.props.data.original}</p>
        <p>Translation: {this.props.data.translation}</p>
        <p>Incorrect: {this.props.data.incorrect_count}</p>
        <p>Correct: {this.props.data.correct_count}</p>
      </div>
    )
  }
}
