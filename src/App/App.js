import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Sidebar, Modal, Button, Header, Icon } from 'semantic-ui-react';
import AppLogo from './AppLogo.png';
import './App.css';
import Drawer from '../Drawer/Drawer';
import SideMenu from '../SideMenu/SideMenu';
import Welcome from '../Content/Welcome/Welcome';
import Programs from '../Content/Programs/Programs';
import Favorites from '../Content/Favorites/Favorites';
import Map from '../Content/Map/Map';
import firebaseService from '../firebaseService';

class App extends Component {
  state = { sidebarVisible: false, programs: [], notifications: [], activeModal: undefined };

  componentDidMount = () => {
    firebaseService.database().ref('programs').orderByChild('from').on('value', function (sn) {
      const data = [];
      sn.forEach((item) => {
        const program = item.val();
        program.key = item.key;
        data.push(program);
      });
      data.sort((a, b) => a.from < b.from ? 1 : (a.from > b.from ? -1 : 0));
      this.setState({ 
        programs: data || []
      });
    }.bind(this));
    firebaseService.database().ref('notifications').on('value', function (sn) {
      const data = [];
      sn.forEach((item) => {
        const program = item.val();
        program.key = item.key;
        data.push(program);
      });
      this.setState({ 
        notifications: data || [],
        activeModal: 0
      });
    }.bind(this));
  };
  
  toggleSidebar = () => this.setState({ sidebarVisible: !this.state.sidebarVisible });
  hideSidebar = () => this.setState({ sidebarVisible: false });
  nextModal = () => this.setState({ activeModal: this.state.activeModal + 1 });

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <div className="App-header-content">
              <Drawer toggleSidebar={this.toggleSidebar} />
              <img src={AppLogo} alt="ELTEFeszt" />
            </div>
          </header>
          <SideMenu visible={this.state.sidebarVisible} hideSidebar={this.hideSidebar} />
          <Sidebar.Pushable className="App-main">
            <Sidebar.Pusher className="App-main-content" onClick={this.state.sidebarVisible ? this.hideSidebar : null}>
              <Route exact path="/" component={() => <Welcome />} />
              <Route exact path="/index.html" component={() => <Welcome />} />
              <Route exact path="/programs" component={() => <Programs programs={this.state.programs} />} />
              <Route exact path="/favorites" component={() => <Favorites programs={this.state.programs} />} />
              <Route exact path="/map" component={() => <Map />} />
            </Sidebar.Pusher>
          </Sidebar.Pushable>
          { 
            this.state.notifications ?
            this.state.notifications.map((notification, key) => (
            <Modal open={this.state.activeModal === key} basic size='tiny' key={key}>
              <Header as="h2" size="medium">
                <Icon name="info" color="blue" size="small" />
                <Header.Content>{ notification.title }</Header.Content>
              </Header>
              <Modal.Content>
                <p>{ notification.text }</p>
              </Modal.Content>
              <Modal.Actions>
                <Button color='green' inverted onClick={ this.nextModal }>OK</Button>
              </Modal.Actions>
            </Modal>
            )) :
            null
          }
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
