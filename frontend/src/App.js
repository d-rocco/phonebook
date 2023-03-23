import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const [addedMessage, setAddedMessage] = useState(null);
  const addedPersonMessage = () => {
    setAddedMessage(`Added ${newName}`);
    setTimeout(() => {
      setAddedMessage(null);
    }, 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const names = persons.map((person) => `${person.name.toLowerCase()}`);
    if (newName !== "" && !names.includes(newName.toLowerCase())) {
      const personObj = { name: newName, number: newNumber };
      setPersons(persons.concat(personObj));

      personsService.create(personObj).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
      addedPersonMessage();
    } else {
      alert(`${newName} is already added to phonebook!`);
    }
    setNewName("");
    setNewNumber("");
  };

  const [searched, setSearched] = useState("");
  const handleFilterChange = (event) => {
    setSearched(event.target.value);
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setPersons(filtered);
  };

  const getPersons = () => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  };

  useEffect(getPersons, []);

  const onDeleteClick = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService.deletePerson(id).then((test) => {
        personsService.getAll().then((test) => {
          setPersons(test);
        });
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification addedMessage={addedMessage} />
      <Filter searched={searched} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} onDeleteClick={onDeleteClick} />
    </div>
  );
};

export default App;
