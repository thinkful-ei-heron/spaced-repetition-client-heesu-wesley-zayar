import './Learning.css'
import React, { Component } from 'react'
import LanguageContext from '../../contexts/LanguageContext'
import LanguageApiService from '../../services/language-api-service'

export default class Learning extends Component {
  state = {
    nextWord: null,
    wordCorrectCount: null,
    wordIncorrectCount: null,
    totalScore: null,
    isCorrect: null,
    answer: null,
  }
  static contextType = LanguageContext

  handleGuess = (e) => {
    e.preventDefault()
    const guessElem = document.getElementById('learn-guess-input')
    let word = null
    let word_id = null
    if (this.state.nextWord) {
      word = this.context.words.find(word => word.original === this.state.nextWord)
      word_id = word.id
    } else {
      word = null
    }

    LanguageApiService.postGuess(guessElem.value, word_id).then(res => {
      const {
        nextWord,
        wordCorrectCount,
        wordIncorrectCount,
        totalScore,
        answer,
        isCorrect,
      } = res
      this.setState({
        nextWord,
        wordCorrectCount,
        wordIncorrectCount,
        totalScore,
        answer,
        isCorrect,
      })
    })
  };

  componentDidMount() {
    LanguageApiService.getHead().then(res => {
      const { nextWord, wordCorrectCount, wordIncorrectCount, totalScore } = res
      this.setState({
        nextWord,
        wordCorrectCount,
        wordIncorrectCount,
        totalScore,
      })
    })
  };

  render() {
    return (
      <div className="Learning">
        <h2>
          Translate the word: <span>{this.state.nextWord}</span>
        </h2>

        {(this.state.isCorrect === true) &&
          <h2>
          You were correct! :D
          </h2>
        }
        
        {(this.state.answer && this.state.isCorrect === false) &&
          <h2>
          Good try, but not quite right :(
          </h2>
        }

        <form className="GuessForm" onSubmit={this.handleGuess}>
          <label>
            What's the translation for this word? <br />
            <input id="learn-guess-input" name="learn-guess-input" type="text" placeholder="Type your answer here" required></input>
          </label> <br />
          <button type="submit">Submit your answer</button>
        </form>

        {this.state.answer &&
          <div className="DisplayFeedback">
            <p>The correct translation for {this.state.nextWord} was {this.state.answer} and you chose {this.state.guess}!</p>
          </div>
        }

        <button>Try another word!</button>

        <div className="DisplayScore">
          <p>Your total score is: {this.state.totalScore}</p>
          <p>You have answered this question correctly {this.state.wordCorrectCount} times.</p>
          <p>You have answered this question incorrectly {this.state.wordIncorrectCount} times.</p>
        </div>

        <footer>
          Copyright © since 2019 <br />
          Wesley Jacobs & Heesu Kang & Zayar Khin. <br />
          All rights reserved.
        </footer>
      </div>
    )
  };
};


