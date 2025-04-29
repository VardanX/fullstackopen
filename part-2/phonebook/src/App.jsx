import { useState } from "react";

const App = () => {

    const [persons, setPersons] = useState([
      { name: "Arto Hellas", phoneNumber: "040-123456", id: 1 },
      { name: "Ada Lovelace", phoneNumber: "39-44-5323523", id: 2 },
      { name: "Dan Abramov", phoneNumber: "12-43-234345", id: 3 },
      { name: "Mary Poppendieck", phoneNumber: "39-23-6423122", id: 4 },
    ]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("")
  const [filterPerson, setFilterPerson] = useState("")


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

  const handleFilterPerson = (e) => {
    setFilterPerson(e.target.value)
  }

  const phoneBookToShow = filterPerson
        ? persons.filter(person => person.name.toLowerCase().includes(filterPerson.toLowerCase()))
        : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with : {" "}
          <input
            type="text"
            id="filter"
            onChange={handleFilterPerson}
            value={filterPerson}
          />
          <h2>Add a new</h2>
        </div>
        
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
      {phoneBookToShow.map((person) => {
          return <p key={person.name}>{person.name} {person.phoneNumber}</p>;
      })}
      <div>debug: {filterPerson}</div>
    </div>
  );
};

export default App;
