import React, { useState } from 'react'

const App = () => {
  console.log('const App loaded')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
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
  
  const filteredPersons = persons.filter( who => who.name.toLowerCase().includes(newSearch.toLowerCase()) )

  const processPerson = (event) => {
    console.log('This is processPerson event:',event)
    console.log('this is checkP()',checkPerson()) 
    event.preventDefault()
    checkPerson() 
    ? window.alert(`${newName} with ${newNumber} is already in the database!`)
    : addPerson()   
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input name="filter" value={newSearch}  onChange={handleSearch}/>
      </div>
      <h3> Add a new </h3>
      <form onSubmit={processPerson}>
        <div> name: <input  name="name" value={newName}  onChange={handleNameChange}/> </div>
        <div> number: <input  name="number" value={newNumber}  onChange={handleNumberChange}/> </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {persons.map(person => <li key={person.id}> {person.name}  {person.number} </li>)}
        </ul>
        <p>filtered</p>
        <ul>
          {filteredPersons.map(person => <li key={person.id}> {person.name}  {person.number} </li>)}
        </ul>
    </div>
  )
}

export default App