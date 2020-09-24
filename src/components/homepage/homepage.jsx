import React from 'react';
import Favorites from '../favorites/favorites';
import SearchBox from '../search-box/search-box';
import styles from './homepage.module.scss'

const HomePage = () => {
    return (
        <div className={styles.homepage}>
            <SearchBox />
            <Favorites />
        </div>
    );
} 
 
export default HomePage;