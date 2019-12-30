import React, { Component } from 'react'
import './Dashboard.css'
import Word from '../Word/Word'
import LanguageContext from '../../contexts/LanguageContext'
import LanguageApiService from '../../services/language-api-service'

export default class Dashboard extends Component {
  static contextType = LanguageContext

  state = {
    loaded: false,
    words: [],
  }

  componentDidMount() {
    LanguageApiService.getLanguage().then(resp => {
      this.context.setLanguage(resp.language)
      this.context.setWords(resp.words)
    })
      .then(() =>
        this.setState({loaded: true})
      )
  }

  render() {
    return (
      <div className="Dashboard">
        <section className="Dashboard-top">
          <h1>Learning Spanish</h1>
          <button>Start Practicing</button>
        </section>

        <section className="Dashboard-main">
          <h3>Words to Practice</h3>
          <div className="WordList">

            {(this.state.loaded && this.context.words) &&
              this.context.words.map(word => {
              return (
                <Word key={word.id} data={word} />
              )
            })}
          </div>
        </section>

        <section className="TotalCount">
          <h3>Total Score</h3>
          <p>Total Score: ____</p>
        </section>
      </div>
    )
  }
}
