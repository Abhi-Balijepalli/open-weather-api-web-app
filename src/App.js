/** @jsxImportSource @emotion/react */
import React, { useState, useEffect} from 'react';
import { css} from '@emotion/react'
import './App.scss';
// require('dotenv').config()

function App() {
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState('');
  const [state, setState] = useState('');
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${state}&appid=${process.env.REACT_APP_API}&units=imperial`;
  
  useEffect(() => {
    fetch(apiUrl)  
    .then(function(resp) { return resp.json() })
    .then(function(data) {
      // hideLoading()
      setApiData(data)
      console.log(data);
    });
  },[apiUrl]);


  const inputForm = (event) => {
    setGetState(event.target.value);
  };
  const submitButton = () => {
    setState(getState);  
  };
  
  function getNormalTime(unix){
    const date = new Date(unix*1000);
    return date.toLocaleDateString("en-US", { hour: 'numeric', hour12: true, minute: '2-digit'});
  }
  
  return (
    <>
    {/* {setState()} */}
    <header class="title"><center>Weather Forcast </center></header>
    {/* <div className = "col-left"> */}
    <div class="Card">
      <div class="CardInner">
      <label>Search for weather forecast in a city</label>
        <div class="container">
          <div class="Icon">
            <svg onClick={submitButton} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#657789" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" class="feather feather-search">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
          </div>
          <div class="InputContainer">
            <input 
              placeholder='Try "Seattle"'
              type="text"
              id="location-name"
              class="form-control"
              onChange={inputForm}
              value={getState}
            />
          </div>
        </div>
      </div>
    {/* </div> */}
    </div>
    
    {apiData.city ? (
      <>
      <br></br>
      <div class="Card">
        <div className="CardInner">
          <h2>Place: {apiData.city.name}</h2>
          <h3>Coordinates: {apiData.city.coord.lon}, {apiData.city.coord.lat}</h3>
          <h3>Population: {apiData.city.population}</h3>
          <h3>Sunrise: {getNormalTime(apiData.city.sunrise)}</h3>
          <h3>Sunset: {getNormalTime(apiData.city.sunset)}</h3>
        </div>
      </div>
      {/* <div > */}
        <div class="col-right">
          {
          apiData.list.map((x) =>
            <div className="CardInner2"
              css={css`
                align-items: center;
                margin: 10px;
                padding:1px 16px;
                border-radius: var(--border-radius);
              `}
              >
              <img
              src={`http://openweathermap.org/img/w/${x.weather[0].icon}.png`}
              className="weather-icon"
              alt=""
              />
              <h3>Time: {x.dt_txt}</h3>
              <label>Weather: {x.weather[0].description}</label>
              <label>Feels Like: {x.main.feels_like} F</label>
              <label>Current Temp: {x.main.temp} F</label>
              <label>High: {x.main.temp_max} F</label>
              <label>Low: {x.main.temp_min} F</label>
              <label>Humidity: {x.main.humidity}</label>
            </div>
          )}
          </div>
      {/* </div> */}
      </>
    ) : (<></>)}
    <footer>Created by Abhi Balijepalli</footer>
    </>
  );
}

export default App;
