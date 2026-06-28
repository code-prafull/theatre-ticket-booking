import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../services/axios";

import Navbar from "../components/shared/Navbar";
import Loader from "../components/shared/Loader";
import CinemaOption from "../components/theatre/CinemaOption";

const TheatreSelection = () => {

  const { movieId } = useParams();

  const [theatres, setTheatres] = useState([]);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      const [movieRes, theatreRes] = await Promise.all([
        API.get(`/movies/${movieId}`),
        API.get("/theatres"),
      ]);

      setMovie(movieRes.data.data);
      setTheatres(theatreRes.data.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto py-8 px-5">

        <h1 className="text-4xl font-bold mb-2">
          {movie?.title}
        </h1>

        <p className="text-gray-500 mb-8">
          Select Your Preferred Theatre
        </p>

        <div className="space-y-5">

          {theatres.map((theatre) => (
            <CinemaOption
              key={theatre._id}
              theatre={theatre}
              movieId={movieId}
            />
          ))}

        </div>

      </div>
    </>
  );
};

export default TheatreSelection;