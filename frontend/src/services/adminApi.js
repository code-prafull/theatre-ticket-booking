import API from "./axios";

// Movies
export const getMovies = () =>
  API.get("/movies");

export const createMovie = (data) =>
  API.post("/movies", data);

export const updateMovie = (id, data) =>
  API.put(`/movies/${id}`, data);

export const deleteMovie = (id) =>
  API.delete(`/movies/${id}`);