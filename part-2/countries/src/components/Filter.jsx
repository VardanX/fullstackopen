function CountriesDetail({country}){
    let languages = []
    for (let lang of Object.values(country[0].languages)){
        languages.push(lang)
    }
    return(
        <div>
            <h1>{country[0].name.common}</h1>
            <ul>
                {country[0].capital.map(c => <li key={c}>{c}</li>)}
            </ul>
            <h2>Languages</h2>
            <ul>
                {languages.map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <img src={country[0].flags.png}/>
            <ul>
                {}
            </ul>
        </div>
    )
}

export default function Filter({countries, filter}){
    let filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    let countriesToShow =
            filteredCountries.length > 10 ? <p>Too many matches, specify another filter</p> :
            filteredCountries.length > 1 ? filteredCountries.map(country => <p key={country.name.common}>{country.name.common}</p>):
            filteredCountries.length === 1 ? <CountriesDetail country={filteredCountries}/>:
            ""
    return(
        <>
            {countriesToShow}
        </>
    )
}
