import {useState, useEffect} from "react"
import axios from "axios"

const owm_api_key = import.meta.env.VITE_OWM_API_KEY;

function CountriesDetail({country}){
    const[weatherData, setWeatherData] = useState({})

    let lat = country.capitalInfo.latlng[0];
    let lon = country.capitalInfo.latlng[1];

    let languages = []
    for (let lang of Object.values(country.languages)){
        languages.push(lang)
    }

    useEffect(() => {
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${owm_api_key}`,
        ).then(response => {
            setWeatherData({
                "temperature":response.data.main.temp,
                "wind":response.data.wind.speed,
                "weatherIcon":response.data.weather[0].icon
            })
        });
    }, [])
    return (
      <div>
        <h2>{country.name.common}</h2>
        <ul>
          {country.capital.map((c) => (
            <li key={c}>Capital {c}</li>
          ))}
        </ul>
        <ul><li>Area {country.area}</li></ul>
        <h2>Languages</h2>
        <ul>
          {languages.map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img src={country.flags.png} />
        <h2>Weather in {country.capital[0]}</h2>
        <h3>Temperature {weatherData.temperature} Celsius</h3>
        <img
          src={`https://openweathermap.org/payload/api/media/file/${weatherData.weatherIcon}.png`}
        />
        <h3>Wind {weatherData.wind} m/s</h3>
      </div>
    );
}

function Button({country}){
    const[showDetail, setShowDetail] = useState(false)
    function handleOnClick(){
        setShowDetail(!showDetail)
    }
    return(
        <>
            <button onClick={handleOnClick}>{showDetail? "hide" : "show"}</button>
            {showDetail ? <CountriesDetail country={country}/> : ""}
        </>
    )
}

export default function Filter({countries, filter}){
    let filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    let countriesToShow =
            filteredCountries.length > 10 ? <p>Too many matches, specify another filter</p> :
            filteredCountries.length > 1 ? filteredCountries.map((country, index) => {
            return <div key={index}>
                    <li key={country.name.common}>
                        {country.name.common}
                    <Button country={country}/>
                </li>
            </div>
            }):
            filteredCountries.length === 1 ? <CountriesDetail country={filteredCountries[0]}/>:
            ""
    return(
        <>
            {countriesToShow}
        </>
    )
}
