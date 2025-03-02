import React, { useEffect } from 'react'
import './Weather.css'
import clearIcon from '../assets/clear.png'
import cloudIcon from '../assets/cloud.png'
import drizzleIcon from '../assets/drizzle.png'
import humidityIcon from '../assets/humidity.png'
import rainIcon from '../assets/rain.png'
import searchIcon from '../assets/search.png'
import snowIcon from '../assets/snow.png'
import windIcon from '../assets/wind.png'

const Weather = () => {

    const [weather, setWeather] = useState(false)

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.VITE_WEATHER_API_KEY}`
            const response = await fetch(url)
            const data = await response.json()
            console.log(data)
            setWeather({
                humidity: data.main.humidity,
                temp: Math.floor(data.main.temp),
                windspeed: data.wind.speed,
                location: data.name,
                icon: data.weather[0].icon
            })
        } catch (error) {
            
        }
    }

    useEffect(() => {
        search("London")
    }, [])


  return (
    <div className='weather'>
        <div className='search-bar'>
            <input type='text' placeholder='Search'/>
            <img src={searchIcon} alt="search input textbox" />
        </div>
        <img src={clearIcon} alt='weather icon' className='weather-icon' />
        <p className='temp'>16°c</p>
        <p className='location'>{weather.name}</p>
        <div className='weather-data'>
            <div className='col'>
                <img src={humidityIcon} alt='humidity icon' />
                <div>
                    <p>91 %</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className='col'>
                <img src={windIcon} alt='wind icon' />
                <div>
                    <p>{weather.windspeed} Km/H</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Weather