const Filter = ({onChange, value}) => {
    return (
      <div>
        filter shown with :{" "}
        <input
          type="text"
          id="filter"
          onChange={onChange}
          value={value}
        />
      </div>
    );
}

export default Filter;
