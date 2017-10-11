import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react'
import './Drawer.css';

class Drawer extends Component {
  render() {
    return (
      <Icon size="big" name="ellipsis vertical" onClick={this.props.toggleSidebar} className="Drawer" />
    );
  }
}

export default Drawer;