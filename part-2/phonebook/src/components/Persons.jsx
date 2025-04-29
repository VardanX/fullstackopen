const Persons = ({phoneBookToShow}) => {
    return (
      <div>
        {phoneBookToShow.map((person) => {
          return (
            <p key={person.name}>
              {person.name} {person.phoneNumber}
            </p>
          );
        })}
      </div>
    );
}

export default Persons;
