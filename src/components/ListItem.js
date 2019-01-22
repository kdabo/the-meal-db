import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import axios from 'axios/index';

import ListItemHeader from './ListItemHeader';
import Image from './Image';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

class ListItem extends Component {
    static propTypes = {
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        category: PropTypes.string,
        instructions: PropTypes.string,
        id: PropTypes.string.isRequired,
    };

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
        request.then((response) => {
            let item = {};
            if (response && response.data && response.data.meals.length > 0) {
                item = response.data.meals[0];
            }

            this.setState({
                item,
            });
        })
            .catch(() => {
                this.setState({
                    item: {},
                });
            });
    }

    openModal(event) {
        event.preventDefault();
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        const { image, title, category, instructions, id } = this.props;
        const { item, modalIsOpen } = this.state;

        return (
            <div className='column meal'>
                <div className='ui card'>
                    <Image image={image} />
                    <div className='content'>
                        <ListItemHeader title={title} />
                        <div className='ui label teal tag'>
                            { category || item.strCategory }
                            {' '}
                        </div>
                        <div className='margin-top'>
                            <button
                                type='button'
                                name={id}
                                className='ui left basic floated secondary button'
                                onClick={this.openModal}
                            >
                                View more
                            </button>
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={this.closeModal}
                                style={customStyles}
                                contentLabel='Modal'
                            >
                                <div className='container ui'>
                                    <button type='button' onClick={this.closeModal}>close</button>
                                    <div className='ui grid margin-top'>
                                        <div className='right aligned four wide column'>
                                            <Image image={image} />
                                        </div>
                                        <div className='left aligned eight wide column'>
                                            <ListItemHeader title={title} />
                                            <div className='content'>
                                                <div
                                                    className='ui label teal tag'
                                                >
                                                    { category || item.strCategory }
                                                </div>
                                                <div
                                                    className='description'
                                                >
                                                    Instructions:
                                                    {' '}
                                                    { instructions || item.strInstructions}
                                                </div>
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
