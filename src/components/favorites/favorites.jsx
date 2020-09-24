import React, { Component } from 'react';
import WeatherCard from '../weather-card/weather-card';
import getWeather from "../../services/weather-service";
import styles from './favorites.module.scss'

class Favorites extends Component {
    state = {
        favsArray: [
            {name: 'tel aviv', data: {}},
            {name: 'berlin', data: {}}
        ]
    }

    populateData() {
        const favsArray = [...this.state.favsArray];
        // if (Object.keys(favsArray[0].data).length === 0) {
            Promise.all(
                favsArray.map(async (location) => {
                    try {
                        let response = await getWeather(location.name);
                        location.data = {...response.data};
                    } catch(error){
                        console.log(error);
                    }
                })
            ).then(() => {
                this.setState({favsArray})
            })
        // }
    }

    componentDidMount() {
        this.populateData();
        this.interval = setInterval(() => {
            this.populateData();
        }, 300000);
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() { 
        const {favsArray} = this.state;
        if (favsArray.length > 0 && Object.keys(favsArray[0].data).length > 0) {
            return (
                <div className={styles.favorites}>
                    {favsArray.map((location) => <WeatherCard key={location.data.id} weather={location.data}/>)}
                </div>
            )
        } else return null;
    }
}
 
export default Favorites;