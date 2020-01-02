
import React, { Component } from 'react';
import './Dashboard.css';
import Word from '../Word/Word';
import LanguageContext from '../../contexts/LanguageContext';
import LanguageApiService from '../../services/language-api-service';
import { Link } from 'react-router-dom';

export default class Dashboard extends Component {
  static contextType = LanguageContext;

  state = {
    loaded: false,
    words: [],
  };

  componentDidMount() {
    LanguageApiService.getLanguage().then(resp => {
      this.context.setLanguage(resp.language)
      this.context.setWords(resp.words)
    })
      .then(() =>
        this.setState({loaded: true})
      )
  };

  render() {
    return (
      <div className="Dashboard">
        <section className="Dashboard-top">
          <h2>Learning {this.context.language.name}</h2>
          <button>
            <Link to="/learn">
              Start Practicing
            </Link>
          </button>
        </section>

        <section className="Dashboard-main">
          <h3>Words to Practice</h3>

          <div className="WordList">
            <ul>
              {(this.state.loaded && this.context.words) &&
              this.context.words.map(word => {
              return (
                <li><Word key={word.id} data={word} /></li>
              )
            })}
            </ul>
          </div>
        </section>

        <section className="TotalCount">
          <h3>Total Score</h3>
          <p>Total Correct Answers: {this.context.language.total_score}</p>
        </section>

        <footer>
          Copyright © since 2019 <br />
          Wesley Jacobs & Heesu Kang & Zayar Khin. <br />
          All rights reserved.
        </footer>
      </div>
    )
  };
};


