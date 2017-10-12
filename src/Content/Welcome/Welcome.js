import React, { Component } from 'react';
import { Statistic, Message, Icon } from 'semantic-ui-react';
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
        <Statistic.Group widths='one'>
          <Statistic color="green" size="huge">
            <Statistic.Label>Több, mint</Statistic.Label>
            <Statistic.Value>{ Math.round(this.props.programCount / 10) * 10 }</Statistic.Value>
            <Statistic.Label>Program az ELTEfeszten</Statistic.Label>
          </Statistic>
        </Statistic.Group>
        <Message info icon size="large">
          <Icon name="info" />
          <Message.Content>
            <strong>Tűzd ki ezt a weblapot a kezdőképernyőre és használd úgy, mint egy appot!</strong>
          </Message.Content>
        </Message> 
        <br />
        <p><strong>{ this.state.intro }</strong></p>
        { this.state.texts.map((text, key) => <p key={'p' + key}>{text}</p>) }
      </div>
    );
  }
}

export default Welcome;