const DateSelector = ({
  dates,
  selectedDate,
  setSelectedDate,
}) => {
  return (
    <div className="flex gap-3 my-6">

      {dates.map((date) => (
        <button
          key={date}
          onClick={() => setSelectedDate(date)}
          className={`px-5 py-2 rounded-lg ${
            selectedDate === date
              ? "bg-red-600 text-white"
              : "bg-gray-200"
          }`}
        >
          {new Date(date).toLocaleDateString()}
        </button>
      ))}

    </div>
  );
};

export default DateSelector;