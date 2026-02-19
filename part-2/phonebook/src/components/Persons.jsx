const Persons = ({phoneBookToShow,handleDeleteContact}) => {
    return (
      <div>
        {phoneBookToShow.map((person) => {
          return (
            <p key={person.id}>
              {person.name} {person.number} <button onClick={() => {handleDeleteContact(person.id, person.name)}}>delete</button>
            </p>
          );
        })}
      </div>  
    );
}

export default Persons;
