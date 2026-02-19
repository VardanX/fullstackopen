import { useState, useEffect } from "react";
import Filter from "./components/Filter.jsx"
import PersonForm from "./components/PersonForm.jsx"
import Persons from "./components/Persons.jsx"
import {getContacts, createContact} from "./services/phonebook.js"


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("")
  const [filterPerson, setFilterPerson] = useState("")

  useEffect(() => {getContacts().then(contacts => setPersons(contacts))});

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
      createContact({ name: newName, number: newPhoneNumber }).then(
        contact => setPersons((prev) => [...prev, contact])
      );
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
