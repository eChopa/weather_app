import React from "react"

export const UserWeather = ({weather}) => {

    return (
        <div className="weather">
            <div>City: <span>{weather.name}</span></div>
            <div>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={weather.weather[0].description}/>
                <span>{weather.weather[0].main}({weather.weather[0].description})</span>
            </div>
            <div>Temperature: <span>{weather.main.temp} &#176;C</span></div>
            <div>Pressure: <span>{weather.main.pressure} kPa</span></div>
            <div>Humidity: <span>{weather.main.humidity} %</span></div>
            <div>Wind speed: <span>{weather.wind.speed} meter/sec</span></div>
        </div>


    )

}