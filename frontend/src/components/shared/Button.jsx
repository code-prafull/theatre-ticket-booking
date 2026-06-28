const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition duration-300 disabled:bg-gray-400 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;