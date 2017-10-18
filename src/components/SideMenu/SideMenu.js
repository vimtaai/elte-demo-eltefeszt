import React, { Component } from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './SideMenu.css';

class SideMenu extends Component {
  render() {
    return (
      <Sidebar as={Menu} animation="overlay" width="thin" 
               visible={this.props.visible} icon="labeled" vertical inverted className="SideMenu"
               onClick={this.props.hideSidebar}>
        <Link to="/">
          <Menu.Item name="comment">
            <Icon name="comment" />
            Köszöntő
          </Menu.Item>
        </Link>
        <Link to="/programs">
          <Menu.Item name="calendar">
            <Icon name="calendar" />
            Programok
          </Menu.Item>
        </Link>
        <Link to="/favorites">
          <Menu.Item name="heart">
            <Icon name="heart" />
            Kedvencek
          </Menu.Item>
        </Link>
        <Link to="/map">
          <Menu.Item name="map">
            <Icon name="map" />
            Térkép
          </Menu.Item>
        </Link>
      </Sidebar>
    );
  }
}

export default SideMenu;