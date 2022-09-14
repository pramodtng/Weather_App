import './App.css';
import Search from './components/search';
import Currenweather from './components/currenweather';
import { API_KEY, WEATHER_URL } from './api';
import {useState} from 'react'
import Forecastweather from './components/forecastweather';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const handleOnSearchChange = (searchData) => {
    // console.log(searchData);
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherData = fetch(`${WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    const forecastWeatherData = fetch(`${WEATHER_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)

    Promise.all([currentWeatherData, forecastWeatherData]).then(async(response) => {
      const weatherResponse = await response[0].json();
      const forecastWeatherResponse = await response[1].json();

      setCurrentWeather({city: searchData.label, ...weatherResponse})
      setForecastWeather({city: searchData.label, ...forecastWeatherResponse})
    }).catch(err => {
      console.log(err)
    })
    // console.log(currentWeather);
    console.log(forecastWeather);
  }
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <Currenweather data = {currentWeather} />}
      {forecastWeather && <Forecastweather data = {forecastWeather}/>}
    </div>
  );
}

export default App;
