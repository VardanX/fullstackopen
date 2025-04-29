const Name = ({onChange, value}) => {
    return (
      <div>
        name:{" "}
        <input
          type="text"
          id="name"
          onChange={onChange}
          value={value}
        />
      </div>
    );
}

const Number = ({onChange, value}) => {
    return (
      <div>
        number:{" "}
        <input
          type="number"
          id="number"
          onChange={onChange}
          value={value}
        />
      </div>
    );
}

const AddButton = ({onClick}) => {
    return (
      <div>
        <button type="submit" onClick={onClick}>
          add
        </button>
      </div>
    );
}

const PersonForm = (
    {
        handleNameChange,
        newName,
        handlePhoneChange,
        newPhoneNumber,
        addPerson
    }) =>{
    return(
    <>
        <form>
            <Name
                onChange={handleNameChange}
                value={newName}
            />
            <Number
                onChange={handlePhoneChange}
                value={newPhoneNumber}
            />
            <AddButton
                onClick={addPerson}
            />
        </form>
    </>
    )
}

export default PersonForm;
// export {Name, Number, AddButton};
