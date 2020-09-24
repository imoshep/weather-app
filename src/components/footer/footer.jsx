import React from 'react';
import styles  from "./footer.module.scss";

const Footer = () => {
    return ( <footer className={styles.footer}><span>Photo by <a href="https://unsplash.com/@soppeldunk?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Marla Prusik</a> on <a href="https://unsplash.com/s/photos/nice-weather?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span></footer> );
}
 
export default Footer;  