import React, { useState, useEffect } from 'react'
import personSrv from './services/persons'

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

const Filter = ({persons,search,deletePerson}) => {
  const filteredPersons = persons.filter( who => who.name.toLowerCase().includes(search.toLowerCase()) )
  return (
    <div>
      <ul>
        {filteredPersons.map(person => <li key={person.id}>
           {person.name}  {person.number}   <button onClick={() => deletePerson(person.id)}> delete </button>
           </li>)}
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

  console.log('this is App content of person: ',persons)
  
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
    const newid = persons.map(p => {return (p.id)})
    const personObject = {
      name: newName,
      number: newNumber,
      id: Math.max(...newid) + 1
    }
    console.log('this is personObject',personObject)
    personSrv
    .create(personObject)
    .then(response => {
      console.log('create person response: ',response)
      updatePersons()
      setNewName('')
      setNewNumber('')
    })
  }
  
  const checkPerson = () => persons.find( who => who.name === newName && who.number === newNumber )
  
  const deletePerson = (id) => {
    if (window.confirm(`Do you really want to delete person iD ${id}`)) {
      console.log('deletePerson:',persons)
      personSrv.remove(id)
      updatePersons()
      }
    }
  
  const updatePersons = () => {
    personSrv
    .getAll()
    .then(response => {
      console.log('updated people')
      console.log(response)
      setPersons(response)
    })
  }

  useEffect(() => {
    console.log('effect')
    personSrv
    .getAll()
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response)
      console.log('render', persons.length)
    })
  }, [])
  
  
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
        <Filter persons={persons} search={newSearch} deletePerson={deletePerson}/>
    </div>
  )
}

export default App