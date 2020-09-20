import React, { useState } from 'react'
import Filter from './components/filter'
import Form from './components/form'
import Book from './components/book'

const App = () => {

  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1, tel: '040 123 4567'}, 
    { name: 'Veijo Repo', id: 2, tel: '040 123 4567'}, 
    { name: 'Pentti Rata', id: 3, tel: '040 123 4567'}, 
    { name: 'Ripa Tonttu', id: 4, tel: '040 123 4567'}, 
    { name: 'Ville Rahtunen', id: 5, tel: '040 123 4567'}, 
    { name: 'Sepe Naattu', id: 6, tel: '040 123 4567'} 
  
  ]) 

  const [ newName, setNewName ] = useState('')
  const [ newNro, setNewNro ] = useState('')
  const [ filter, setFilter ] = useState('')

  const addNewName = (event) => {
    event.preventDefault()

  const names = persons.map(person => {
    return person.name
  })
   const isAlready = names.includes(newName)
   
   if (isAlready) {
    alert (`Name ${newName} already exists`)
   } else {

    const noteObject = {
      name: newName,
      tel: newNro,
      // date: new Date().toISOString(),
      // important: Math.random() > 0.5,
      id: persons.length + 1,
    }
  
    setPersons(persons.concat(noteObject))
    setNewName('')
    setNewNro('')

   }

  }

  const handleFilterChange = (eventFilter) => {
    setFilter(eventFilter.target.value)
    // console.log(eventFilter.target.value)
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNroChange = (eventNro) => { 
    setNewNro(eventNro.target.value)
  }
  const personsToShow = filter
  ? persons.filter (persons => persons.name.toLowerCase().includes(filter.toLowerCase())) 
  : persons


  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value = {filter} onChange={handleFilterChange} />
      <h2>Add a new name</h2>
      <Form 
        onSubmit={addNewName}
        valueNewName={newName} 
        onChangeNote={handleNoteChange}
        valueNewNro={newNro}
        onChangeNro={handleNroChange}
      />
      <h2>Numbers</h2>
      <Book person={personsToShow} />
    </div>
  )

}

export default App