import React, { Component } from 'react'

const LanguageContext = React.createContext({
  error: null,
  setError: () => { },
  clearError: () => { },
})

export default LanguageContext

export class LanguageContextProvider extends Component {
  state = {
    language: {
      id: null,
      name: null,
      user_id: null,
      head: null,
      total_score: 0,
    },
    words: [
      {
        id: null,
        language_id: null,
        original: null,
        translation: null,
        next: null,
        memory_value: null,
        correct_count: null,
        incorrect_count: null,
      }
    ],
    error: null,
    setLanguage: () => { },
    setWords: () => { },
    setError: () => { },
    clearError: () => { },

  }

  setLanguage = (language) => {
    this.setState({
      ...this.state,
      language,
    })
  }

  setWords = (words) => {
    this.setState({
      ...this.state,
      words,
    })
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  render() {
    const value = {
      setLanguage: this.setLanguage,
      setWords: this.setWords,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
    }
    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}
