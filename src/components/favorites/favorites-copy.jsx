import React, { useState, useEffect } from 'react';
import WeatherCard from '../weather-card/weather-card';
import getWeather from "../../services/weather-service";
import styles from './favorites.module.scss'

const Favorites = () => {
    const [favsArray, setFavsArray] = useState([
        {name: 'tel aviv', data: {}},
        {name: 'berlin', data: {}}
    ])

    
    useEffect(() => {
        (function populateData() {
            if (Object.keys(favsArray[0].data).length === 0) {
                console.log('populating');
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
                    setFavsArray(favsArray)
                })
            }
        })()
    }, [favsArray])

    
    if (favsArray.length > 0) {
        console.log('1');
        console.log(favsArray[0].data);
        if (Object.keys(favsArray[0].data).length > 0) {
        console.log('2');
        return (
            <div className={styles.favorites}>
                {favsArray.map((location) => <WeatherCard key={location.data.id} weather={location.data}/>)}
            </div>
        )
    }
    else return null;
}
else return null;
}
 
export default Favorites;