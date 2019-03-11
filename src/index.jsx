import React from 'react';
import { render } from 'react-dom';
import { Wrapper } from './Wrapper';
import DemoBase from './DemoBase';

const App = () => <DemoBase />;

render(<App />, document.getElementById('root'));
