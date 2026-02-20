export default function SearchBar({value, handleInputChange}){
    return(
        <>
            <label>Find Countries</label>
            <input type="text" onChange={handleInputChange} value={value}/>
        </>
    )
}
