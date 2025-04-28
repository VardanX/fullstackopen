import { useState } from "react";

const App = () => {

  const [persons, setPersons] = useState([{ name: "Arto Hellas", phoneNumber: 1234567}]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("")

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
      setPersons([...persons, {name: newName, phoneNumber: newPhoneNumber}])
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handlePhoneChange = (e) => {
    setNewPhoneNumber(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:{" "}
          <input
            type="text"
            id="name"
            onChange={handleNameChange}
            value={newName}
          />
        </div>

        <div>
          number:{" "}
          <input
            type="number"
            id="number"
            onChange={handlePhoneChange}
            value={newPhoneNumber}
          />
        </div>

        <div>
          <button type="submit" onClick={addPerson}>
            add
          </button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name} {person.phoneNumber}</p>
      ))}
      {/* <div>debug: {newName}</div> */}
    </div>
  );
};

export default App;
