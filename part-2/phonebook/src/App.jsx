import { useState, useEffect } from "react";
import Filter from "./components/Filter.jsx"
import PersonForm from "./components/PersonForm.jsx"
import Persons from "./components/Persons.jsx"
import axios from "axios";


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("")
  const [filterPerson, setFilterPerson] = useState("")

  useEffect(() => {
    axios
    .get("http://localhost:3001/persons")
    .then(response => {
      setPersons(response.data)
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    let isIncluded = false
    persons.forEach(person => {
      if(newName === person.name){
        isIncluded = true
      }
    })
    if(isIncluded){
      window.alert(`${newName} is already added to the phonebook`)
    }else{
      setPersons([...persons, {name: newName, number: newPhoneNumber}])
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handlePhoneChange = (e) => {
    setNewPhoneNumber(e.target.value)
  }

  const handleFilterPerson = (e) => {
    setFilterPerson(e.target.value)
  }

  const phoneBookToShow = filterPerson
        ? persons.filter(person => person.name.toLowerCase().includes(filterPerson.toLowerCase()))
        : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        onChange={handleFilterPerson}
        value={filterPerson}
      />
      <h3>Add a new</h3>
      <PersonForm
        handleNameChange={handleNameChange}
        newName={newName}
        handlePhoneChange={handlePhoneChange}
        newPhoneNumber={newPhoneNumber}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons
        phoneBookToShow={phoneBookToShow}
      />
    </div>
  );
};

export default App;
