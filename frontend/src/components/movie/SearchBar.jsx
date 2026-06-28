const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search Movies..."
      value={value}
      onChange={onChange}
      className="w-full border rounded-xl p-4 mb-8 outline-none focus:ring-2 focus:ring-red-500"
    />
  );
};

export default SearchBar;