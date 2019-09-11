import React, {useState, useEffect} from "react"
import { checkFetchRequestHTTP } from "../../helpers/fetchHTTPHadndle";

export const UserPosition = ({setWeatherData}) => {
    const [isLaoding, setLoading] = useState(false)
    const [weather, setWeather] = useState(null)
    const [location, setLocation] = useState({status: null, result: null})
    const getPosition = (location) => {
        setLocation({status: 1, result: location.coords})
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=3696ca63f35355477b35ab7745017dfc`)
            .then(checkFetchRequestHTTP)
            .then(response => response.json())
            .then(data => {
                setWeather(data)
            })
            .catch(error => setLoading({status: 0, result: `${error}. Please try again`}))
        setLoading(false)
    }
    const handleGetPosition = (error) => {
        switch (error.code) {
            case 1:
                setLocation({status: 0, result: 'You denied geolocation. Please turn in on to get geolocation'})
                break
            case 2:
                setLocation({status: 0, result: 'No connection to server. Please check your internet connection and try again'})
                break
            case 3:
                setLocation({status: 0, result: 'Geolocation is going to long. Please check your internet connection and try again'})
                break
            default:
                setLocation({status: 0, result: 'Someone lost your geolocation. Please try again'})
        }
        setLoading(false)
    }
    const  getGeoData = () => {
        setLoading(true)
        setLocation({status: null, result: null})
        setTimeout(()=>{navigator.geolocation.getCurrentPosition(getPosition,handleGetPosition)}, 2000)
    }
    useEffect(()=>{
        getGeoData()
    },[])
    return (
        <div className="userCoordinates">
            {
                isLaoding?
                <div>Loading geoposition data. Please wait <div className="spinner"></div></div>
                :location.status?
                    <div>
                        <p>Latitude: {location.result.latitude}</p>
                        <p>Longitude: {location.result.longitude}</p>
                        {weather? <p>City: {weather.name}</p>:null}
                        <button onClick={()=>{setWeatherData(weather)}}>Get Weather</button>
                    </div>
                    :
                    <div>
                        <p>{location.result}</p>
                    </div>
            }
            {
                location.status === 0?
                    <button onClick={()=>{getGeoData()}}>Try again</button>
                    :null
            }
        </div>

    )
}


