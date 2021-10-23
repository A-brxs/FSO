import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newPerson, setNewPerson ] = useState('')
  
  const handePersonChange = (event) => {
    console.log(event.target.value)
    setNewPerson(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newPerson
    }
  
    setPersons(persons.concat(personObject))
    setNewPerson('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
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
      <div>debug: {newPerson}</div>
    </div>
  )
}

export default App