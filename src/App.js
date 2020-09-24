import React from 'react';
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import HomePage from './components/homepage/homepage';
import styles from './App.module.scss'

function App() {
  return (
   <div className={styles.app}>
     <Header />
     <HomePage />
     <Footer /> 
   </div>
  );
}

export default App;
