import React, { useState } from "react";
import getWeather from "../../services/weather-service";
import WeatherCard from "../weather-card/weather-card";
import styles from "./search-box.module.scss";

const SearchBox = () => {
  const [inputValue, setinputValue] = useState("");
  const [searchResult, setSearchResult] = useState({
    success: false,
    data: {},
  });
  let interval;

  const handleChange = ({ currentTarget }) => {
    setinputValue(currentTarget.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (interval) clearInterval(interval);
    try {
      let response = await getWeather(inputValue);
      response.success
        ? setSearchResult({ ...response })
        : setSearchResult({ ...response.response.data });
      interval = setInterval(async () => {
        response = await getWeather(inputValue);
        setSearchResult({ ...response });
      }, 300000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.searchBox}>
      <form action="" onSubmit={handleSubmit} className={styles.searchForm}>
        <label htmlFor="searchInput" className={styles.label}>
          WHAT'S THE WEATHER NOW IN
        </label>
        <input
          className={styles.input}
          type="text"
          name="searchInput"
          onChange={handleChange}
          value={inputValue}
        />
        <button className={styles.submit} type="submit">
          <i className="fas fa-search"></i>
        </button>
      </form>
      {searchResult.success && <WeatherCard weather={searchResult.data} />}
      {!searchResult.success && (
        <h3>
          Requested location not found,
          <br /> try another query
        </h3>
      )}
    </div>
  );
};

export default SearchBox;
