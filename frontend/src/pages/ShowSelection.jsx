import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../services/axios";

import Navbar from "../components/shared/Navbar";
import Loader from "../components/shared/Loader";
import DateSelector from "../components/show/DateSelector";
import TimeSlot from "../components/show/TimeSlot";

const ShowSelection = () => {

  const { theatreId } = useParams();

  const [shows, setShows] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] =
    useState("");

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {

    try {

      const { data } =
        await API.get("/shows");

      const theatreShows =
        data.data.filter(
          (show) =>
            show.theatre._id === theatreId
        );

      setShows(theatreShows);

      if (theatreShows.length)
        setSelectedDate(
          theatreShows[0].showDate
        );

    } finally {

      setLoading(false);

    }

  };

  if (loading) return <Loader />;

  const dates = [
    ...new Set(
      shows.map((show) => show.showDate)
    ),
  ];

  const filteredShows =
    shows.filter(
      (show) =>
        show.showDate === selectedDate
    );

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto py-8">

        <DateSelector
          dates={dates}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <div className="flex gap-4 flex-wrap">

          {filteredShows.map((show) => (
            <TimeSlot
              key={show._id}
              show={show}
            />
          ))}

        </div>

      </div>
    </>
  );
};

export default ShowSelection;