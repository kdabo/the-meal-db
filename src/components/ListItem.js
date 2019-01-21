import React from 'react';

import ListItemHeader from './ListItemHeader';
import Image from "./Image";

const ListItem = props => {
  return (
    <div className='column'>
      <div className='ui card'>
        <Image image={props.image}/>
        <div className='content'>
          <ListItemHeader title={props.title}/>
        </div>
      </div>
    </div>
  )
};

export default ListItem;

