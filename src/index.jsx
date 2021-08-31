import React from 'react';
import { render } from 'react-dom';
import { Wrapper } from './Wrapper';
import 'semantic-ui-css/semantic.min.css';

const App = () => <Wrapper />;

render(<App />, document.getElementById('root'));
