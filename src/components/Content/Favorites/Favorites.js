import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Label, Icon, Message } from 'semantic-ui-react';
import localStorageService from '../../../services/localStorageService';

import '../Programs/Programs.css';

class Favorites extends Component {
  state = { favorites: [] };

  componentDidMount = () => {
    this.setState({ favorites: this.getFavorites() });
  };

  getFavorites = () => this.props.programs.filter((program) => localStorageService.getItem('favorites').indexOf(program.key.toString()) !== -1);

  toggleFavorite = (e) => {
    const favorites = localStorageService.getItem('favorites') || [];
    const programKey = e.target.getAttribute('data-program');

    console.log(favorites, programKey);
    if (favorites.indexOf(programKey) !== -1) {
      favorites.splice(favorites.indexOf(programKey), 1);
    }

    localStorageService.setItem('favorites', favorites);
    this.setState({ favorites: this.getFavorites() });
  };

  render() {
    return (
      <div>
        <h1>Kedvencek</h1>
        { 
          this.state.favorites.length === 0 ? 
          <Message info size="large">
            Egyelőre még nincsenek kedvenceid. Keress a <Link to="/programs">programok</Link> között és add őket a kedvencekhez!
          </Message> :
          ''
        }
        { this.state.favorites.map((program) => (
          <Card fluid key={'program' + program.key}>      
            <Card.Content>
              <Card.Header>{ program.title }</Card.Header>
              <Card.Description>{ program.description }</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="Program-tags">
                <Label> <Icon name='clock' /> { program.from }-{ program.to }</Label>
                <Label> <Icon name='marker' /> { program.location }</Label>
                { program.speaker ? <Label> <Icon name='user' /> { program.speaker }</Label> : '' }
                { program.faculty ? <Label> <Icon name='university' /> { program.faculty }</Label> : '' }
              </div>
            </Card.Content>
            <Card.Content extra>
              <Button fluid color="red" data-program={program.key} onClick={this.toggleFavorite}>Mégsem érdekel</Button>
            </Card.Content>
          </Card>
        )) }
      </div>
    );
  }
}

export default Favorites;