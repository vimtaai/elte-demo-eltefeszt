import React, { Component } from 'react';
import { Button, Card, Input, Label, Icon } from 'semantic-ui-react';
import './Programs.css';
import localStorageService from '../../localStorageService';

class Program extends Component {
  state = { visiblePrograms: [], favorites: [] };

  componentDidMount = () => {
    this.setState({ 
      visiblePrograms: this.props.programs, 
      favorites: localStorageService.getItem('favorites') || []
    });
  };

  filter = (e) => {
    const searchText = e.target.value.toLowerCase();
    const visiblePrograms = this.props.programs.filter((program) => 
      (program.title || '').toLowerCase().indexOf(searchText) !== -1 ||
      (program.description || '').toLowerCase().indexOf(searchText) !== -1 ||
      (program.speaker || '').toLowerCase().indexOf(searchText) !== -1 ||
      (program.faculty || '').toLowerCase().indexOf(searchText) !== -1
    );    
    this.setState({ visiblePrograms });
  };

  toggleFavorite = (e) => {
    const favorites = localStorageService.getItem('favorites') || [];
    const programKey = e.target.getAttribute('data-program');

    if (favorites.indexOf(programKey) !== -1) {
      favorites.splice(favorites.indexOf(programKey), 1);
    } else {
      favorites.push(programKey);
    }

    localStorageService.setItem('favorites', favorites);
    this.setState({ favorites: favorites || [] });
  };

  render() {
    return (
      <div>
        <h1>Programok</h1>
        <Input fluid size="large" icon="search" placeholder="Keresés..." className="Programs-search" onChange={this.filter} />
        { this.state.visiblePrograms.map((program) => (
          <Card fluid key={'program' + program.key}>      
          <Card.Content>
          <Card.Header>{ program.title }</Card.Header>
              <Card.Description>{ program.description }</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="Programs-tags">
                <Label> <Icon name='clock' /> { program.from }-{ program.to }</Label>
                <Label> <Icon name='marker' /> { program.location }</Label>
                { program.speaker ? <Label> <Icon name='user' /> { program.speaker }</Label> : '' }
                { program.faculty ? <Label> <Icon name='university' /> { program.faculty }</Label> : '' }
              </div>
            </Card.Content>
            <Card.Content extra>
              <Button fluid data-program={program.key} onClick={this.toggleFavorite}
                      color={ this.state.favorites.indexOf(program.key.toString()) !== -1 ? 'yellow' : 'green' } >
                { this.state.favorites.indexOf(program.key.toString()) !== -1 ? 'Mégsem érdekel' : 'Érdekel' }
              </Button>
            </Card.Content>
          </Card>
        )) }
      </div>
    );
  }
}

export default Program;