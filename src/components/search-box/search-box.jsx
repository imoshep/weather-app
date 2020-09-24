import React, { useState } from 'react';
import getWeather from "../../services/weather-service";
import WeatherCard from '../weather-card/weather-card'
import styles from "./search-box.module.scss";

const SearchBox = () =>{
    const [inputValue, setinputValue] = useState('');
    const [searchResult, setSearchResult] = useState({name: '', data: {}});
    let interval;

    const handleChange = ({currentTarget}) => {
        setinputValue(currentTarget.value)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (interval) clearInterval(interval) 
        try {
            let response = await getWeather(inputValue);
            setSearchResult({...response})
            interval = setInterval(async () => {
                response = await getWeather(inputValue);
                setSearchResult({...response})
            }, 300000);
        } catch(error){
            console.log(error);
        }
    }

    return (
        <div className={styles.searchBox}>
            <form action="" onSubmit={handleSubmit} className={styles.searchForm}>
                <label htmlFor="searchInput" className={styles.label}>WHAT'S THE WEATHER NOW IN</label>
                <input className={styles.input} type="text" name="searchInput" onChange={handleChange} value={inputValue}/>
                <button className={styles.submit}><i className="fas fa-search"></i></button>
            </form>
            {Object.keys(searchResult.data).length > 0 && <WeatherCard weather={searchResult.data}/>}
        </div>  
    );
}
 
export default SearchBox;