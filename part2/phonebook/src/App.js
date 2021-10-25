import React, { useState } from 'react'

const App = () => {
  console.log('const App loaded')
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '3333333' }
  ]) 
  const [ newName, setNewName ] = useState('') 
  const [ newNumber, setNewNumber ] = useState('') 
  
  const handleNameChange = (event) => {
    console.log('handleNameChange',event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log('handleNumberChange',event.target.value)
    setNewNumber(event.target.value)
  }

  const addPerson = () => {
    console.log('this is persons',persons)
    const personObject = {
      name: newName,
      number: newNumber
    }
    console.log('this is personObject',personObject)
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }
  
  const checkPerson = () => persons.find( who => who.name === newName && who.number === newNumber )
  
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
      <form onSubmit={processPerson}>
        <div> name: <input  name="name" value={newName}  onChange={handleNameChange}/> </div>
        <div> number: <input  name="number" value={newNumber}  onChange={handleNumberChange}/> </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {persons.map(person => <li key={person.name}> {person.name}  {person.number} </li>)}
        </ul>
        <div>debug name: {newName} debug number: {newNumber}</div>
    </div>
  )
}

export default App