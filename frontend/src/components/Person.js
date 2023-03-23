const Person = ({ name, number, id, onDeleteClick }) => {
  return (
    <div>
      {name} {number}{" "}
      <button type="submit" onClick={() => onDeleteClick(id, name)}>
        delete
      </button>
    </div>
  );
};

export default Person;
