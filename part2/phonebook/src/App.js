import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = (props) => {
  const {newSearch, handleSearch} = props
  console.log('Search loaded')
  console.log('newSearch: ',newSearch)
  console.log('handleSearch: ',handleSearch)
  return (
    <div>
    filter shown with <input name="filter" value={newSearch}  onChange={handleSearch}/>
    </div>
  )
}

const PersonForm = ({process,newName,handleNameChange,newNumber,handleNumberChange}) => {
  return (
    <div>
      <form onSubmit={process}>
        <div> name: <input  name="name" value={newName}  onChange={handleNameChange}/> </div>
        <div> number: <input  name="number" value={newNumber}  onChange={handleNumberChange}/> </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Filter = ({persons,search}) => {
  const filteredPersons = persons.filter( who => who.name.toLowerCase().includes(search.toLowerCase()) )
  return (
    <div>
      <ul>
        {filteredPersons.map(person => <li key={person.id}> {person.name}  {person.number} </li>)}
      </ul>
    </div>
  )
}

const App = () => {
  console.log('const App loaded')
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('') 
  const [ newNumber, setNewNumber ] = useState('') 
  const [ newSearch, setSearch ] = useState('') 
  
  const handleNameChange = (event) => {
    console.log('handleNameChange',event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log('handleNumberChange',event.target.value)
    setNewNumber(event.target.value)
  }
  const handleSearch = (event) => {
    console.log('handleSearch',event.target.value)
    setSearch(event.target.value)
  }
  
  const processPerson = (event) => {
    console.log('This is processPerson event:',event)
    console.log('this is checkP()',checkPerson()) 
    event.preventDefault()
    checkPerson() 
    ? window.alert(`${newName} with ${newNumber} is already in the database!`)
    : addPerson()   
  }
  
  const addPerson = () => {
    console.log('this is persons',persons)
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    console.log('this is personObject',personObject)
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }
  
  const checkPerson = () => persons.find( who => who.name === newName && who.number === newNumber )
  
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')


  return (
    <div>
      <h2>Phonebook</h2>
        <Search newSearch={newSearch} handleSearch={handleSearch}/>  
      <h3> Add a new </h3>
        <PersonForm 
          process={processPerson} 
          newName={newName} handleNameChange={handleNameChange} 
          newNumber={newNumber} handleNumberChange={handleNumberChange} 
        />
      <h3>Numbers</h3>
        <Filter persons={persons} search={newSearch}/>
    </div>
  )
}

export default App