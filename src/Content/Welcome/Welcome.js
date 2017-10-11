import React, { Component } from 'react';
import firebaseService from '../../firebaseService';
import './Welcome.css';

class Welcome extends Component {
  state = { 
    intro: '', 
    texts: []
  };

  componentDidMount() {
    firebaseService.database().ref('welcome').on('value', function (sn) {
      const data = sn.val();
      this.setState({ 
        intro: data.intro,
        texts: data.texts
      });
    }.bind(this));
  }

  render() {
    return (
      <div className="Welcome">
        <h1>Köszöntjük az ELTEfeszt résztvevőit!</h1>
        <p><strong>{ this.state.intro }</strong></p>
        { this.state.texts.map((text, key) => <p key={'p' + key}>{text}</p>) }
      </div>
    );
  }
}

export default Welcome;