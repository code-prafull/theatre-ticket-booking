import { Link } from "react-router-dom";

const TimeSlot = ({ show }) => {
  return (
    <Link
      to={`/seats/${show._id}`}
      className="bg-red-600 text-white px-4 py-2 rounded-lg"
    >
      {show.showTime}
    </Link>
  );
};

export default TimeSlot;