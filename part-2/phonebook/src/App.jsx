import { useState, useEffect } from "react";
import Filter from "./components/Filter.jsx"
import PersonForm from "./components/PersonForm.jsx"
import Persons from "./components/Persons.jsx"
import {getContacts, createContact, deleteContact} from "./services/phonebook.js"


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("")
  const [filterPerson, setFilterPerson] = useState("")

  useEffect(() => {
    getContacts().then(contacts => setPersons(contacts))
    .catch((error) => {
      alert("Server error");
      console.log(error.message, error.name)
    })
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
      createContact({ name: newName, number: newPhoneNumber })
        .then((contact) => setPersons((prev) => [...prev, contact]))
        .catch(() => alert("Something went wrong!"));
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

  const handleDeleteContact = (id, name) => {

    let deletePerson = window.confirm(`Delete ${name}`);
    if(deletePerson){
      deleteContact(id)
      .then(
        setPersons((persons) => persons.filter((person) => person.id != id))
      )
      .catch(() => alert("Something went wrong!"));
    }
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
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
