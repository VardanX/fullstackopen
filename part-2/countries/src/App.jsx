import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar"
import axios from "axios";
import Filter from "./components/Filter.jsx";

export default function App(){

  const [input, setInput] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(response.data);
      });
  },[])


  function handleInputChange(e){
    e.preventDefault();
    setInput(e.target.value)
  }

  return(
    <>
      <SearchBar value={input} handleInputChange={handleInputChange}/>
      <Filter countries={countries} filter={input}/>
    </>
  )
}
