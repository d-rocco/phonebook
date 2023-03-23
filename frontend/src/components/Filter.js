const Filter = ({ searched, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input value={searched} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
