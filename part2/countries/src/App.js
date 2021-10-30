import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = (props) => {
  const {newSearch, handleSearch} = props
  console.log('Search loaded')
  console.log('newSearch: ',newSearch)
  console.log('handleSearch: ',handleSearch)
  return (
    <div>
    Find countries with:  <input name="filter" value={newSearch}  onChange={handleSearch}/>
    </div>
  )
}

const Filter = (props) => {
  const {country,search} = props
  console.log('filter-countries: ', country)
  console.log('filter-search: ', search)
  const filteredCountries = country.filter( c => c.name.toLowerCase().includes(search.toLowerCase()) )
  console.log('length of filter: ',filteredCountries)
  if (filteredCountries.length >= 10 ) {
    return (
      <div>
        <p>Too many countries...</p>
      </div>
    )
  }
  if (filteredCountries.length === 1 ) {
    return (
      <Countryinfo info={filteredCountries} weather={props.weather}/>
    )
  }
  return (
    <div>
      <ul>
        {filteredCountries.map(c => <li key={c.alpha3Code}> {c.name}  {c.number} </li>)}
      </ul>
    </div>
  )
}

const Countryinfo = (props) => {
  const {info} = props
  console.log('info: ',info)
  return (
    <div>
      <h2>{info[0].name}</h2>
      <p>Capital {info[0].capital}</p>
      <p>Population {info[0].population}</p>
      <h3>Languages</h3>
      <ul>
      {info[0].languages.map(l => <li key={l.name}> {l.name}</li> )}
      </ul>
      {<img 
      src={info[0].flags.png}
      alt={"Flag of " + info[0].name}></img>}
      <Weather capital={info[0].capital} weather={props.weather}/>
    </div>
  )
}

const Weather = ({capital}) => {
  const access_key = process.env.REACT_APP_WEATHER_API_KEY
    
  let {weather} = getWeather(access_key,capital)
  console.log('this is weather: ',weather)
  //let src = currentWeather.current.weather_icons[0]
  //let winds = currentWeather.current.wind_speed
  //let windd = currentWeather.current.wind_dir
  
  return (
    <div>
      {<h3>Weather in {capital}</h3>}
      {<p>Temperature: {weather}</p>}
      {
        //<img 
        //src={}
        //alt={"Weather of " + capital}></img>}      
        //{<p>Wind: {} mph, direction {}</p>
      }
    </div>
  )
  
}

const getWeather = (access_key,country) => {
  const request = axios.get(`http://api.weatherstack.com/current?access_key=${access_key}&query=${country}`)
  return (
    request.then(response => response.data),
    console.log('this is request: ',request))
}

const App = () => {
  console.log('const App loaded')
  const [countries, setCountries] = useState([])
  const [ newSearch, setSearch ] = useState('ma') 
  const [weather, setWeather] = useState([])

  const handleSearch = (event) => {
    console.log('handleSearch',event.target.value)
    setSearch(event.target.value)
  }

  useEffect(() => {
    console.log('country effect')
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  return (
    <div>
        <Search newSearch={newSearch} handleSearch={handleSearch}/>  
        <Filter country={countries} search={newSearch} weather={weather}/>
    </div>
  )

}

export default App