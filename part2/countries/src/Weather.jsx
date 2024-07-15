import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"

const Weather = ({ city }) => {
    const [temperature, setTemperature] = useState(NaN)
    const [wind, setWind] = useState(NaN)
    const [icon, setIcon] = useState(null)

    const url = `https://samples.openweathermap.org/data/2.5/weather?q=${city}&appid=b1b15e88fa797225412429c1c50c122a1`
    useEffect(() => {
        axios.get(url).then(response => {
            console.log(response)
            setTemperature((response.data.main.temp - 273.15).toFixed(2))
            setWind(response.data.wind.speed)
            setIcon(response.data.weather[0].icon)
        })
    }, [])

    return (
        <div>
            <h2>Weather in {city}</h2>

            <p>temperature {temperature} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={icon} />
            <p>wind {wind} m/s</p>
        </div>
    )
}

export default Weather