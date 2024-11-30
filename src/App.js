import React, { useState, useEffect } from 'react';
import './index.css';
import axios from 'axios';
import Show from '../src/Show.jsx';

function App() {
  const [data, setData] = useState({}); // Weather data
  const [location, setLocation] = useState(''); // User input location

  const apiKey = '46cdff2bad3e4064fc0e60a2bc401e1e'; // Replace with your API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=`; // Base URL

  // Function to fetch random city weather (replace with your list)
  const fetchRandomCityWeather = async () => {
    const randomCities = ['Lagos',
      'London',
      'New York',
      'Tokyo',
      'Paris',
      'Berlin',
      'Rome',
      'Madrid',
      'São Paulo',
      'Buenos Aires',
      'Moscow',
      'Beijing',
      'Seoul',
      'Sydney',
      'Melbourne',
    ]; // Sample list

    const randomIndex = Math.floor(Math.random() * randomCities.length);
    const randomCity = randomCities[randomIndex];

    try {
      const response = await axios.get(`${url}${randomCity}&units=imperial&appid=${apiKey}`);
      setData(response.data);
      setLocation(randomCity); // Update location state for display
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Handle errors here (e.g., display an error message)
    }
  };

  // Fetch random city weather on component mount (initial render)
  useEffect(() => {
    fetchRandomCityWeather();
  }, []);

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      try {
        const response = await axios.get(`${url}${location}&units=imperial&appid=${apiKey}`);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        // Handle errors here (e.g., display an error message)
      }
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
        />
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>

          <div className="temp">
            {data.main && <h1>{data.main.temp.toFixed()}°F</h1>}
          </div>

          <div className="description">
            {data.weather && (
              <p className="bold">{data.weather[0].main}</p>
            )}
          </div>
        </div>


        <div className='mid'>
          <Show/>
        </div>

        {data.name && (
          <div className="bottom">
            <div className="feels">
              {data.main && (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              )}
              <p>Feels Like</p>
            </div>

            <div className="humidity">
              {data.main && <p className="bold">{data.main.humidity}%</p>}
              <p>Humidity</p>
            </div>

            <div className="wind">
              {data.wind && (
                <p className="bold">{data.wind.speed.toFixed()}MPH</p>
              )}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;









