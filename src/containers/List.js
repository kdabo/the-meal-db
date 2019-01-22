import React, { Component } from 'react';
import axios from 'axios';

import ListItem from '../components/ListItem';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
        };

        this.filterOnClick = this.filterOnClick.bind(this);
    }

    componentDidMount() {
        const request = axios.get('https://www.themealdb.com/api/json/v1/1/latest.php');
        request.then((response) => {
            this.setState({
                isLoaded: true,
                items: response.data.meals,
            });
        })
            .catch((error) => {
                this.setState({
                    isLoaded: true,
                    error,
                });
            });
    }

    filterOnClick(event) {
        event.preventDefault();

        const request = axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?${event.target.name}`);
        request.then((response) => {
            this.setState({
                isLoaded: true,
                items: response.data.meals,
            });
        })
            .catch((error) => {
                this.setState({
                    isLoaded: true,
                    error,
                });
            });
    }

    render() {
        const { error, isLoaded, items } = this.state;

        if (error) {
            return (
                <div>
                    Error:
                    {error.message}
                </div>
            );
        } if (!isLoaded) {
            return <div>Loading...</div>;
        }
        return (
            <div className='list-container'>
                <h2 className='ui container left aligned header'>Meals</h2>

                <div className='ui container'>
                    <button type='submit' name='i=chicken%20breast' onClick={this.filterOnClick}>Chicken</button>
                    <button type='submit' name='c=Seafood' onClick={this.filterOnClick}>Seafood</button>
                    <button type='submit' name='a=Canadian' onClick={this.filterOnClick}>Canadian</button>
                </div>

                <br />
                <br />
                <br />

                <ul className='ui four column doubling grid container'>
                    {items && items.map(item => (
                        <ListItem
                            image={item.strMealThumb}
                            title={item.strMeal}
                            key={item.idMeal}
                            category={item.strCategory}
                            instructions={item.strInstructions}
                            id={item.idMeal}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default List;
