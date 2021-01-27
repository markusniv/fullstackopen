import React, { useState } from 'react'

const People = (props) => {
    const { peopleToShow } = props;
    return(
        <>
            {peopleToShow.map(person =>
                <p key={person.id}>{person.name} {person.phoneNumber}</p>
            )}
        </>
    )
}

const Filter = (props) => {
    return(
        <>
            filter shown with
            <input
                value={props.newSearch}
                onChange={props.handleFilterChange}
            />
        </>
    )
}

const PersonForm = (props) => {
    return(
        <form onSubmit={props.addPerson}>
            <div>
                name:   <input
                value={props.newName}
                onChange={props.handleNameChange}
            />
                <br></br>
                number: <input
                value={props.newNumber}
                onChange={props.handleNumberChange}
            />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const App = () => {
    const [ people, setPeople] = useState([
        {
            id: 1,
            name: 'Arto Hellas',
            phoneNumber: '040-1231244'
        }
    ])
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ newSearch, setNewSearch ] = useState('');

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    const handleFilterChange = (event) => {
        setNewSearch(event.target.value);
    }

    const addPerson = (event) => {
        event.preventDefault();
        const personObject = {
            name: newName,
            phoneNumber: newNumber,
            id: people.length + 1
        }
        const alreadyIncluded = people.some( person => person['name'] === personObject.name);

        if (!alreadyIncluded) {
            setPeople(people.concat(personObject));
            setNewName('');
            setNewNumber('');
        } else {
            window.alert(`${personObject.name} is already in the phonebook.`);
        }
    }

    const peopleToShow = people.filter(person => person.name.toLowerCase().includes(newSearch));

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter newSearch={newSearch} handleFilterChange={handleFilterChange} />
            <h2>add new</h2>
            <PersonForm addPerson={addPerson}
                       newName={newName}
                       newNumber={newNumber}
                       handleNameChange={handleNameChange}
                       handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <People peopleToShow={peopleToShow}></People>
        </div>
    )

}

export default App
