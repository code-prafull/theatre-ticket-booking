// File Path: components/components/admin/MovieForm.jsx
import { useEffect, useState } from "react";

const MovieForm = ({ movie, onSubmit, onCancel }) => {
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
        genre: Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre || "",
        cast: Array.isArray(movie.cast) ? movie.cast.join(", ") : movie.cast || "",
        releaseDate: movie.releaseDate?.substring(0, 10) || "",
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
      genre: typeof form.genre === "string" ? form.genre.split(",").map((g) => g.trim()) : form.genre,
      cast: typeof form.cast === "string" ? form.cast.split(",").map((c) => c.trim()) : form.cast,
      duration: Number(form.duration),
      rating: Number(form.rating),
    });
  };

  // Base Matte Styles
  const inputClass = "w-full bg-[#121216] border border-white/10 rounded-xl p-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#5B50E6] focus:ring-1 focus:ring-[#5B50E6]/30 transition-all";

  return (
    <form
      onSubmit={submitHandler}
      className="w-full flex flex-col gap-6 text-left select-none bg-[#16161C] p-6 sm:p-8 rounded-2xl border border-white/5 shadow-2xl"
    >
      
      {/* Header Info */}
      <div className="w-full border-b border-white/5 pb-4 flex justify-between items-center">
        <div>
          <h3 className="text-base font-extrabold text-white tracking-tight">
            Movie Specifications Metadata
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Provide detailed media links and structural operational tags.
          </p>
        </div>
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            className="text-gray-400 hover:text-white transition-colors text-sm font-bold bg-white/5 w-8 h-8 rounded-lg flex items-center justify-center border border-white/5"
          >
            ✕
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        
        {/* Title */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-0.5">Feature Film Title</label>
          <input
            className={inputClass}
            placeholder="e.g. Meg 2: The Trench"
            name="title"
            value={form.title}
            onChange={changeHandler}
            required
          />
        </div>

        {/* Description TEXTAREA FIX: Explicit white text color block alignment */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-0.5">Plot Story Description</label>
          <textarea
            className="w-full bg-[#121216] border border-white/10 rounded-xl p-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#5B50E6] min-h-[120px] resize-none transition-all"
            placeholder="Type your story synopsis here... text will stay perfectly bright white."
            name="description"
            value={form.description}
            onChange={changeHandler}
            required
          />
        </div>

        {/* Genre */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-0.5">Genre (Comma Separated)</label>
          <input
            className={inputClass}
            placeholder="Action, Sci-Fi"
            name="genre"
            value={form.genre}
            onChange={changeHandler}
            required
          />
        </div>

        {/* Language */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-0.5">Broadcast Language</label>
          <input
            className={inputClass}
            placeholder="English, Hindi"
            name="language"
            value={form.language}
            onChange={changeHandler}
            required
          />
        </div>

        {/* Duration */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-0.5">Duration (Minutes)</label>
          <input
            className={inputClass}
            placeholder="116"
            name="duration"
            type="number"
            value={form.duration}
            onChange={changeHandler}
            required
          />
        </div>

        {/* Release Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-0.5">Release Date</label>
          <input
            className={`${inputClass} cursor-pointer scheme-dark`}
            type="date"
            name="releaseDate"
            value={form.releaseDate}
            onChange={changeHandler}
            required
          />
        </div>

        {/* Poster Link */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-0.5">Poster CDN URL</label>
          <input
            className={inputClass}
            placeholder="https://images.unsplash.com..."
            name="poster"
            value={form.poster}
            onChange={changeHandler}
            required
          />
        </div>

        {/* Trailer Link */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-0.5">Trailer Embed URL</label>
          <input
            className={inputClass}
            placeholder="https://www.youtube.com/embed/..."
            name="trailer"
            value={form.trailer}
            onChange={changeHandler}
          />
        </div>

        {/* Rating */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-0.5">Rating (1.0 - 10.0)</label>
          <input
            className={inputClass}
            placeholder="7.5"
            name="rating"
            type="number"
            step="0.1"
            value={form.rating}
            onChange={changeHandler}
            required
          />
        </div>

        {/* Director */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-0.5">Director Name</label>
          <input
            className={inputClass}
            placeholder="Ben Wheatley"
            name="director"
            value={form.director}
            onChange={changeHandler}
            required
          />
        </div>

        {/* Cast */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-0.5">Cast Crew (Comma Separated)</label>
          <input
            className={inputClass}
            placeholder="Jason Statham, Wu Jing"
            name="cast"
            value={form.cast}
            onChange={changeHandler}
            required
          />
        </div>

        {/* Status Dropdown */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-0.5">Broadcast Status</label>
          <select
            className={`${inputClass} text-white cursor-pointer appearance-none bg-no-repeat`}
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundSize: '1.25rem' }}
            name="status"
            value={form.status}
            onChange={changeHandler}
          >
            <option className="bg-[#121216] text-white py-2" value="Now Showing">Now Showing</option>
            <option className="bg-[#121216] text-white py-2" value="Coming Soon">Coming Soon</option>
          </select>
        </div>

      </div>

      {/* Action Handlers Controller Buttons */}
      <div className="w-full border-t border-white/5 pt-5 mt-2 flex flex-col sm:flex-row justify-end items-center gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white text-sm font-bold py-3.5 px-8 rounded-xl transition-all"
          >
            Cancel & Close
          </button>
        )}
        <button 
          type="submit"
          className="w-full sm:w-auto bg-[#5B50E6] hover:bg-[#493fd3] text-white text-sm font-bold py-3.5 px-10 rounded-xl shadow-lg transition-all"
        >
          Save Movie Entity
        </button>
      </div>

    </form>
  );
};

export default MovieForm;