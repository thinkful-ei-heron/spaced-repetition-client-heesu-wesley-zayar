import './Learning.css';
import React, { Component } from 'react';
import LanguageContext from '../../contexts/LanguageContext';
import LanguageApiService from '../../services/language-api-service';

export default class Learning extends Component {
  state = {
    nextWord: null,
    wordCorrectCount: 0,
    wordIncorrectCount: 0,
    totalScore: null,
    isCorrect: null,
    answer: null,
    guess: null,
  }
  static contextType = LanguageContext

  nextWord = (e) => {
    e.preventDefault()
    LanguageApiService.getHead().then(res => {
      this.setState({
        nextWord: res.nextWord,
        wordCorrectCount: res.wordCorrectCount,
        wordIncorrectCount: res.wordIncorrectCount,
        totalScore: res.totalScore,
        isCorrect: null,
        guess: null,
        answer: null,
      })
    })
  }

  handleGuess = (e) => {
    e.preventDefault()
    const guessElem = document.getElementById('learn-guess-input')
    let word = null
    let word_id = null
    try {
      if (this.state.nextWord && guessElem.value) {
        word = this.context.words.find(word => word.original === this.state.nextWord)
        word_id = word.id
      } else {
        word = null
      };
    } catch(e) {
      this.setState({error: e})
    }


    LanguageApiService.postGuess(guessElem.value, word_id).then(res => {
      const {
        wordCorrectCount,
        wordIncorrectCount,
        totalScore,
        answer,
        isCorrect,
      } = res
      this.setState({
        ...this.state,
        wordCorrectCount,
        wordIncorrectCount,
        totalScore,
        answer,
        isCorrect,
        guess: guessElem.value,
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
        <h2>Translate the word:</h2>
        <span>{this.state.nextWord}</span>

        {(this.state.isCorrect === true) && <h2>You were correct!</h2>}

        {(this.state.answer && this.state.isCorrect === false) &&
          <h2>Good try, but not quite right :(</h2>
        }


        {!this.state.guess &&
          <form className="GuessForm">
            <label htmlFor="learn-guess-input">
              What's the translation for this word?
            <input id="learn-guess-input" name="learn-guess-input" type="text" placeholder="Type your answer here" required></input>
            </label> <br />
            {!this.state.answer &&
              <button onClick={this.handleGuess}>Submit your answer</button>
            }
          </form>
        }

        {this.state.answer &&
          <div className="DisplayFeedback">
            <p>The correct translation for {this.state.nextWord} was {this.state.answer} and you chose {this.state.guess}</p>
          </div>
        }

        {this.state.guess &&
          <button onClick={this.nextWord}>Try another word!</button>
        }

        <div className="DisplayScore">
          <p className="totalScr">Your total score is: {this.state.totalScore}</p>
          <p>You have answered this question correctly {this.state.wordCorrectCount} times.</p>
          <p>You have answered this question incorrectly {this.state.wordIncorrectCount} times.</p>
        </div>

        <footer>
          Copyright © since 2020 <br />
          Wesley Jacobs & Heesu Kang & Zayar Khin <br />
          All rights reserved.
        </footer>
      </div>
    )
  };
};
