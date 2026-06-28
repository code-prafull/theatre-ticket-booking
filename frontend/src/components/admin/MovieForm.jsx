import { useEffect, useState } from "react";

const MovieForm = ({ movie, onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    genre: "",
    language: "",
    duration: "",
    releaseDate: "",
    poster: "",
    trailer: "",
    rating: "",
    cast: "",
    director: "",
    status: "Coming Soon",
  });

  useEffect(() => {
    if (movie) {
      setForm({
        ...movie,
        genre: movie.genre.join(", "),
        cast: movie.cast.join(", "),
        releaseDate: movie.releaseDate?.substring(0, 10),
      });
    }
  }, [movie]);

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,
      genre: form.genre.split(",").map((g) => g.trim()),
      cast: form.cast.split(",").map((c) => c.trim()),
      duration: Number(form.duration),
      rating: Number(form.rating),
    });
  };

  const input =
    "border p-3 rounded-lg w-full";

  return (
    <form
      onSubmit={submitHandler}
      className="grid gap-4"
    >
      <input
        className={input}
        placeholder="Title"
        name="title"
        value={form.title}
        onChange={changeHandler}
      />

      <textarea
        className={input}
        placeholder="Description"
        name="description"
        value={form.description}
        onChange={changeHandler}
      />

      <input
        className={input}
        placeholder="Genre (Action, Drama)"
        name="genre"
        value={form.genre}
        onChange={changeHandler}
      />

      <input
        className={input}
        placeholder="Language"
        name="language"
        value={form.language}
        onChange={changeHandler}
      />

      <input
        className={input}
        placeholder="Duration"
        name="duration"
        type="number"
        value={form.duration}
        onChange={changeHandler}
      />

      <input
        className={input}
        type="date"
        name="releaseDate"
        value={form.releaseDate}
        onChange={changeHandler}
      />

      <input
        className={input}
        placeholder="Poster URL"
        name="poster"
        value={form.poster}
        onChange={changeHandler}
      />

      <input
        className={input}
        placeholder="Trailer URL"
        name="trailer"
        value={form.trailer}
        onChange={changeHandler}
      />

      <input
        className={input}
        placeholder="Rating"
        name="rating"
        type="number"
        value={form.rating}
        onChange={changeHandler}
      />

      <input
        className={input}
        placeholder="Cast (A,B,C)"
        name="cast"
        value={form.cast}
        onChange={changeHandler}
      />

      <input
        className={input}
        placeholder="Director"
        name="director"
        value={form.director}
        onChange={changeHandler}
      />

      <select
        className={input}
        name="status"
        value={form.status}
        onChange={changeHandler}
      >
        <option>Now Showing</option>
        <option>Coming Soon</option>
      </select>

      <button className="bg-red-600 text-white py-3 rounded-lg">
        Save Movie
      </button>
    </form>
  );
};

export default MovieForm;