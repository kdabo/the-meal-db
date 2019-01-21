import React, { Component } from 'react';

import Header from './Header';
import List from './List';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <List/>
      </div>
    );
  }
}
