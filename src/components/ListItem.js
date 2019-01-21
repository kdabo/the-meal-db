import React, {Component}  from 'react';
import Modal from 'react-modal';

import ListItemHeader from './ListItemHeader';
import Image from './Image';
import axios from 'axios/index';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      item: {},
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    const request = axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.props.id}`);
    request.then(response => {
      let item = {};
      if(response && response.data && response.data.meals.length > 0) {
        item = response.data.meals[0]
      }

      this.setState({
        isLoaded: true,
        item:  item
      })
    })
      .catch(error => {
        this.setState({
          isLoaded: true,
          error: error,
          item: {}
        })
      });
  }

  openModal(event) {
    event.preventDefault();
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
        <div className='column meal'>
          <div className='ui card'>
            <Image image={this.props.image}/>
            <div className='content'>
              <ListItemHeader title={this.props.title}/>
              <div className='ui label teal tag'>{this.props.category || this.state.item.strCategory}</div>
              <div className='margin-top'>
                <button name={this.props.idMeal} className='ui left basic floated secondary button' onClick={this.openModal}>View more</button>
                <Modal
                  isOpen={this.state.modalIsOpen}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  contentLabel='Modal'
                >
                  <div className='container ui'>
                    <button onClick={this.closeModal}>close</button>
                    <div className='ui grid margin-top'>
                      <div className='right aligned four wide column'>
                        <Image image={this.props.image}/>
                      </div>
                      <div className='left aligned eight wide column'>
                        <ListItemHeader title={this.props.title}/>
                        <div className='content'>
                          <div className='ui label teal tag'>{this.props.category || this.state.item.strCategory}</div>
                          <div className='description'>Instructions: {this.props.instructions || this.state.item.strInstructions}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default ListItem;
