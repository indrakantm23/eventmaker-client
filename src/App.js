import React, { useState, useEffect } from 'react';
import './App.scss';
import Header from './shared/Header';
import Footer from './shared/Footer';
import CommonService from './components/commonService';
import AppTemplate from './AppTemplate';
import { Router } from './routing/Routing';

function App(props) {

  const [city, setCity] = useState({
    currentCity: 'Select Address',
    fullAddress: ''
  });

  useEffect(()=> {
    const successfulLookup = (position) => {
        const { latitude, longitude } = position.coords;
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=7579c80561b848d4a280fea36965add8`).then(resp => resp.json())
            .then(res => {
                const tempCity = res ? res.results[0].components.city : 'Select Address';
                let result = res.results[0].components;
                setCity(prevState => ({
                    ...prevState,
                    currentCity: tempCity,
                    fullAddress: `${result.city}, ${result.state}, ${result.country}, ${result.postcode}`,
                }))
                if(localStorage.getItem('currentCity') === null) {
                    CommonService.setCurrentCity(result.components.city);
                }
                
                localStorage.setItem('currentLocation', `${result.city}, ${result.state}, ${result.country}, ${result.postcode}`)
            })
    }
    navigator.geolocation.getCurrentPosition(successfulLookup, console.log())
  },[])

  return (
      <div style={{marginTop: 60}}>
        <Router>
            <Header currentLocation={{city}} {...props} />
            <AppTemplate />
            <Footer/>
        </Router>
      </div>
  );
}

export default App;
