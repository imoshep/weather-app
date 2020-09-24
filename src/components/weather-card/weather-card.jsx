import React, { useState, useEffect } from 'react';
import styles from './weather-card.module.scss'
import { autoRefresh } from "../../services/weather-service";
import { useMediaQuery } from 'react-responsive'

const WeatherCard = ({weather}) => {
    const {location, 
        iconSrc, 
        sampledAtDayHour, 
        verbalDesc, 
        currentTempCelsius, 
        precipitation, 
        humidity, 
        windSpeed} = weather;

    const [showDetails, setShowDetails] = useState(false); 
    
    // useEffect(() => {
    //     if (weather.location) {
    //         autoRefresh(location)
    //         return clearAutoRefresh()
    //     }
    // }, [])

    function parseAlt(str) {
        const sliced = str.slice((str.lastIndexOf('/')+1), (str.lastIndexOf('.')));
        return sliced.replace('_', " ")
    }

    function toggleShowMore() {
        if (!isMD) setShowDetails(!showDetails);
    }

    const isMD = useMediaQuery({query: '(min-device-width: 576px)'})

    if (Object.keys(weather).length > 0) {

        // console.log(location);
        return (
            <span className={`${styles.card} ${showDetails ? 'show' : ''}`} onClick={toggleShowMore}>
                <div className={styles.topRow}>
                    <div className={styles.iconTemp}>
                        <img src={iconSrc} alt={parseAlt(iconSrc)} className={styles.image}/>
                        <span className={styles.tempDeg}>
                            <span className={styles.deg}>&deg;C</span>
                            <span className={styles.temp}>{currentTempCelsius}</span>
                        </span>
                    </div>
                    <div className={styles.locTimeTxt}>
                        <span className={styles.location}>{location}</span>
                        <span className={styles.time}>{sampledAtDayHour}</span>
                        <span className={styles.text}>{verbalDesc}</span>
                    </div>
                    {!isMD && <div className={styles.caret} ><i className="fas fa-angle-down"></i></div>}
                </div>
                <div className={styles.moreDetailes}>
                    <span className={styles.percipitation}>סיכוי לגשם:&nbsp;{precipitation}</span>
                    <span className={styles.humidity}>לחות:&nbsp;{humidity}</span>
                    <div className={styles.wind}>מהירות הרוח:&nbsp;{windSpeed}</div>
                </div>
            </span>
        );
    }
    return null;
}
 
export default WeatherCard;