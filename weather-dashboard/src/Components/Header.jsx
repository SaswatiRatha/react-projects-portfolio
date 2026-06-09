export default function Header({searchCity, setSearchCity, handleClick}){
    return(
        <div className="search-section">
            <input 
            type="text"
            className="search-bar"
            placeholder="Search city name here"
            value={searchCity}
            onChange={(e)=>setSearchCity(e.target.value)} 
            />
            <button className="search-btn" onClick={handleClick}>Get Weather</button>
      </div>
    )
}