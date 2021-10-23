import React, { useState } from 'react'

const App = () => {
  console.log('const App loaded')
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newPerson, setNewPerson ] = useState('')
  
  const handePersonChange = (event) => {
    console.log(event.target.value)
    setNewPerson(event.target.value)
  }

  const addPerson = () => {
    console.log('this is newPerson:',newPerson)
    console.log('this is persons',persons)
    const personObject = {
      name: newPerson
    }
    setPersons(persons.concat(personObject))
    setNewPerson('')
  }
  
  const checkPerson = () => persons.find( who => who.name === newPerson )
  
  const processPerson = (event) => {
    console.log('This is processPerson event:',event)
    console.log('this is checkP()',checkPerson()) 
    event.preventDefault()
    checkPerson() 
    ? window.alert(`${newPerson} is already in the database!`)
    : addPerson()   
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={processPerson}>
        <div>
          name: <input   value={newPerson}  onChange={handePersonChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {persons.map(person => <li key={person.name}> {person.name} </li>)}
        </ul>
    </div>
  )
}

export default App