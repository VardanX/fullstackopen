import { useState, useEffect } from "react";
import Filter from "./components/Filter.jsx"
import PersonForm from "./components/PersonForm.jsx"
import Persons from "./components/Persons.jsx"
import {getContacts, createContact, deleteContact, updateContact} from "./services/phonebook.js"
import "./index.css"
import Notification from "./components/Notification.jsx";


const App = () => {
  const [count , setCount] = useState(0)
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("")
  const [filterPerson, setFilterPerson] = useState("")
  const [message, setMessage] = useState("");
  const [error, setError] = useState("")

  function notify(msg, error){
    setMessage(`${msg}`);
    setError(error);
    setTimeout(() => {
      setError("");
      setMessage("");
    }, 5000);
  }

  useEffect(() => {
    getContacts().then(contacts => setPersons(contacts))
    .catch((error) => {
      alert("Server error");
      console.log(error.message, error.name)
    })
  }, [count]);

  const addPerson = (e) => {
    e.preventDefault();
    let isIncluded = false
    let personId = ""
    persons.forEach(person => {
      if(newName === person.name){
        isIncluded = true
        personId = person.id
      }
    })
    if(isIncluded){
      let replaceNumber = window.confirm(`${newName} is already added to the phonebook, replace the old number with new one?`);
      if(replaceNumber){
        updateContact(personId, { name: newName, number: newPhoneNumber })
          .then(() => {
            setCount(count + 1)
            notify(`Updated ${newName}`, false)
          })
          .catch((error) => {
            // notify(`Information about ${newName} has already been removed from the server`, newName, true)
            if (error.response.data.error) {
              notify(error.response.data.error, true);
            }
          });
      }
    }else{
      createContact({ name: newName, number: newPhoneNumber })
        .then((contact) => {
          setPersons((prev) => [...prev, contact])
          notify(`Added ${newName}`, false)
        })
        .catch(error => {
          notify(error.response.data.error, true)
        });
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
      <Notification error={error} message={message}/>
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
