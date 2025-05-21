const Persons = ({phoneBookToShow}) => {
    return (
      <div>
        {phoneBookToShow.map((person) => {
          return (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          );
        })}
      </div>
    );
}

export default Persons;
