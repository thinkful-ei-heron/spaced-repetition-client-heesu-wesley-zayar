import React, { Component } from 'react'

export default class Word extends Component {
  static defaultProps = {
    data: null,

  }

  state = {
    original: 'test',
    language: 'spanish',
    translation: 'testo',
    correctCount: 1,
    incorrectCount: 2,
    next: null,
  }

  componentDidMount() {
    this.setState({
      original: this.props.data.original,
      language: this.props.data.language,
      translation: this.props.data.translation,
      correctCount: this.props.data.correctCount,
      incorrectCount: this.props.data.incorrectCount,
      next: this.props.data.next,
    })
  }
  render() {
    return (
      <div className="Word">
        <p>{this.state.original}</p>
        <p>Translation: {this.state.translation}</p>
        <p>Incorrect: {this.state.incorrectCount}</p>
        <p>Correct: {this.state.correctCount}</p>
      </div>
    )
  }
}
