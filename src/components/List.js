import React, { Component } from 'react';

import ListItem from '../components/ListItem';

class List extends Component {

  componentDidMount() {

  }

  render() {

    return (
      <div>
        <h2 className='ui container left aligned header'>Meals</h2>
        <div className='ui four column doubling grid container'>
          <ListItem title="hi"/>
        </div>
      </div>
    )
  }
}

export default List;
