import Person from "./Person";

const Persons = ({ persons, onDeleteClick }) => {
  return (
    <>
      {persons.map((person) => (
        <Person
          key={person.name}
          name={person.name}
          number={person.number}
          id={person.id}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </>
  );
};

export default Persons;
