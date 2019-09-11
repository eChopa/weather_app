import React, {useState} from 'react';
import { UserPosition } from './components/Weather/WeatherHeader'
import { UserWeather } from "./components/Weather/UserWeather";


export const App = () => {
    const [weather, setWeather] = useState(null)
    const setWeatherData = (location) => {
        setWeather(location)
        console.log(location)
    }
  return (
    <div className="App">
        {
            weather?
                <UserWeather weather={weather} />
                :<UserPosition setWeatherData={setWeatherData} />
        }


    </div>
  );
}
