import './Learning.css'
import React, { Component } from 'react'
import LanguageContext from '../../contexts/LanguageContext'

export default class Learning extends Component {
  static contextType = LanguageContext
  render() {
    return (
      <div className="Learning">
        Learning
      </div>
    )
  }
}
