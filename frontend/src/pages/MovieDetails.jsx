import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../services/axios";

import Navbar from "../components/shared/Navbar";
import Loader from "../components/shared/Loader";
import MovieHeader from "../components/movie/MovieHeader";

const MovieDetails = () => {

  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchMovie();

  }, []);

  const fetchMovie = async () => {

    try {

      const { data } = await API.get(
        `/movies/${id}`
      );

      setMovie(data.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  if (loading) return <Loader />;

  if (!movie)
    return (
      <h1 className="text-center mt-10">
        Movie Not Found
      </h1>
    );

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto py-10 px-6">

        <MovieHeader movie={movie} />

        {movie.trailer && (
          <div className="mt-12">

            <h2 className="text-3xl font-bold mb-5">
              Trailer
            </h2>

            <iframe
              className="w-full h-[500px] rounded-xl"
              src={movie.trailer}
              title={movie.title}
              allowFullScreen
            />

          </div>
        )}

      </div>
    </>
  );
};

export default MovieDetails;