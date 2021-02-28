import React, { useState, useEffect } from 'react';
import './App.scss';
import Header from './shared/Header';
import Footer from './shared/Footer';
import AppTemplate from './AppTemplate';
import { Router } from './routing/Routing';
import { Provider } from 'react-redux';
import store from './store';

function App() {

  const [city, setCity] = useState({
    currentCity: 'Select Address',
    fullAddress: ''
  });

  useEffect(()=> {
    const successfulLookup = (position) => {
        const { latitude, longitude } = position.coords;
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=7579c80561b848d4a280fea36965add8`).then(resp => resp.json())
            .then(res => {
                const tempCity = res ? res.results[0].formatted.split(' ')[0] : 'Select Address';
                setCity(prevState => ({
                    ...prevState,
                    currentCity: tempCity,
                    fullAddress: res.results[0].formatted
                }))
                localStorage.setItem('currentLocation', res.results[0].formatted)
            })
    }
    navigator.geolocation.getCurrentPosition(successfulLookup, console.log())
  },[])

  return (
    <Provider store={store}>
        <div style={{marginTop: 60}}>
          <Router>
              <Header currentLocation={{city}}/>
              <AppTemplate />
              <Footer/>
          </Router>
        </div>
    </Provider>
  );
}

export default App;
