const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
      />
    </div>
  );
};

export default Input;