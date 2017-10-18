import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import serviceWorkerService from './services/serviceWorkerService';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorkerService();