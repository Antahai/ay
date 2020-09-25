import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import Form from './components/Form'


function App() {
  
  const [countries, setCountries ] = useState([])
  const [selectedCountry, setSelectedCountry ] = useState('')
  const [openWeather, setOpenWeather] = useState(null)
  const [city, setCity] = useState(null)
  const iconUrl = 'http://openweathermap.org/img/wn/'
  const iconExt = '@2x.png'

  const selectCountry = (event) => {
    event.preventDefault()
  
  }

  const handleSelectedCountry = (event) => {
    
    setSelectedCountry(event.target.value)
    setCity(null)
  }

  const hook = () => {
    // console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)        
      })
  
  }

  useEffect(hook, [])

  const hook2 = () => {
    console.log('weather done, setp 1', city)
    if(city !== null){
    axios
      .get('https://api.openweathermap.org/data/2.5/weather?q='+ city + '&appid=' + process.env.REACT_APP_WEATHERAPIKEY)
      .then(response => {
      setOpenWeather(response.data)
      console.log('weather get done, step 2')
      
      }) 
    }
    }
  
  useEffect(hook2, [city])
  


  const showCountry = countries.filter(x => x.name.toLowerCase().includes(selectedCountry.toLowerCase()))

  return (
    <div className="App">

    <Form value={selectedCountry} onChange={handleSelectedCountry}/>

{/*-------------- if more than 10 countries ----------------------*/}
      {showCountry.length > 10 && 
      <p>Too many matches, please give me more...</p>}

{/* -----------show list of countries ----------------------------*/}
      {(showCountry.length < 11 && showCountry.length > 1 ) &&
        showCountry.map(country => 
          <div key = {country.name}>
            <h3 >{country.name} 
              <form 
                onSubmit={selectCountry} 
                style={{display: "inline", marginLeft:10}}>
                  <button type = "button" 
                    onClick={handleSelectedCountry} 
                    value={country.name}>
                      Show
                  </button>
              </form>
            </h3>
          </div>)}

{/* --------- show detailed info of countries -------------------*/}
      {(showCountry.length < 2 && selectedCountry !== '') && 
          
           showCountry.map(country => 
            <div key = {country.capital}>

            {/*  set state for new city */}
            {city === null && setCity(country.capital)}

              <h2>{country.name}</h2>
               <p>
                 <strong>Capital:</strong> {country.capital}
                <br/>
                  <strong>Population:</strong> {country.population}
                </p>
                 <p><strong>Languages:</strong></p>
              <ul>
                 {country.languages.map(lang => 
                    <li key={lang.name}>
                      {lang.name}
                    </li>)}
              </ul>
              <img 
                alt = "flag" 
                src={country.flag} 
                style={{width:100, border: 1, borderStyle: "solid" }}
              />
            
          {(openWeather !== null) && 
            <div>
              <h3>Weather in {country.capital}</h3>
              <p>Teperature: {(openWeather.main.temp - 273.15).toFixed(1)} °C</p>
              <img 
                alt={openWeather.weather[0].description} 
                src={iconUrl + openWeather.weather[0].icon + iconExt}
              />
              <p>{openWeather.weather[0].description}</p>

              <p style = {{display: "inline-block"}}>
                Wind speed: {openWeather.wind.speed} m/s, direction: {openWeather.wind.deg} °
              </p>

              {/*-- Direction arrow -- */}
              <div 
                style={{transform: "rotate(" + (openWeather.wind.deg-90) + "deg)", 
                display: "inline-block", 
                marginLeft:10, 
                position: "relative",
                top:5  }}
              >
              <img alt="arrow" src="arrow.png" width="24"/></div><br/>
              Humidity: {openWeather.main.humidity}%
            </div>
          } 
            
          </div>
          )}
    </div>
  );
}

export default App;

