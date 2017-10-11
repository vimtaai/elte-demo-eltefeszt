import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import AreaMap from './AreaMap.png';

class Map extends Component {
  render() {
    return (
      <div>
        <h1>Térkép</h1>
        <Image fluid src={AreaMap} alt="A Trefort-kert térképe" />
      </div>
    );
  }
}

export default Map;