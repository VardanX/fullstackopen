import {useState} from "react"

function CountriesDetail({country}){
    let languages = []
    for (let lang of Object.values(country.languages)){
        languages.push(lang)
    }
    return(
        <div>
            <h2>{country.name.common}</h2>
            <ul>
                {country.capital.map(c => <li key={c}>{c}</li>)}
            </ul>
            <h2>Languages</h2>
            <ul>
                {languages.map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <img src={country.flags.png}/>
            <ul>
                {}
            </ul>
        </div>
    )
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
