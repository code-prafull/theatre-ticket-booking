// import { useEffect, useState } from "react";
// import { Container } from "@mui/material";

// import Navbar from "../components/shared/Navbar";
// import HeroBanner from "../components/movie/HeroBanner";
// import SearchBar from "../components/movie/SearchBar";
// import MovieGrid from "../components/movie/MovieGrid";
// import Loader from "../components/shared/Loader";

// import API from "../services/axios";

// const Home = () => {
//   const [movies, setMovies] = useState([]);
//   const [filteredMovies, setFilteredMovies] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   useEffect(() => {
//     const filtered = movies.filter((movie) =>
//       movie.title.toLowerCase().includes(search.toLowerCase())
//     );

//     setFilteredMovies(filtered);
//   }, [search, movies]);

//   const fetchMovies = async () => {
//     try {
//       const { data } = await API.get("/movies");

//       setMovies(data.data);
//       setFilteredMovies(data.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <>
//       <Navbar />

//       <Container maxWidth="xl" sx={{ mt: 4 }}>
//         <HeroBanner />

//         <SearchBar
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <MovieGrid movies={filteredMovies} />
//       </Container>
//     </>
//   );
// };

// export default Home;

import { useEffect, useState } from "react";

import API from "../services/axios";

import Navbar from "../components/shared/Navbar";
import HeroBanner from "../components/movie/HeroBanner";
import SearchBar from "../components/movie/SearchBar";
import MovieGrid from "../components/movie/MovieGrid";
import Loader from "../components/shared/Loader";

const Home = () => {

  const [movies, setMovies] = useState([]);

  const [filteredMovies, setFilteredMovies] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {

    const filtered = movies.filter((movie) =>
      movie.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredMovies(filtered);

  }, [search, movies]);

  const fetchMovies = async () => {

    try {

      const { data } =
        await API.get("/movies");

      setMovies(data.data);

      setFilteredMovies(data.data);

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

      <div className="max-w-7xl mx-auto px-5 py-8">

        <HeroBanner />

        <SearchBar
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <MovieGrid
          movies={filteredMovies}
        />

      </div>
    </>
  );
};

export default Home;
