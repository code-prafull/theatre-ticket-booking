import { useEffect, useState } from "react";
import API from "../../services/axios";

const Show = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const { data } = await API.get("/shows");
      setShows(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteShow = async (id) => {
    if (!window.confirm("Delete Show?")) return;

    try {
      await API.delete(`/shows/${id}`);
      fetchShows();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen p-10">

      <div className="flex justify-between mb-8">

        <h1 className="text-4xl font-bold">
          Shows
        </h1>

        <button className="bg-red-600 text-white px-5 py-3 rounded-lg">
          Add Show
        </button>

      </div>

      <table className="w-full border">

        <thead className="bg-black text-white">

          <tr>

            <th className="p-3">Movie</th>

            <th>Theatre</th>

            <th>Date</th>

            <th>Time</th>

            <th>Price</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {shows.map((show) => (

            <tr
              key={show._id}
              className="text-center border-b"
            >

              <td>{show.movie?.title}</td>

              <td>{show.theatre?.name}</td>

              <td>
                {new Date(show.showDate).toLocaleDateString()}
              </td>

              <td>{show.showTime}</td>

              <td>₹{show.ticketPrice}</td>

              <td>

                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                  Edit
                </button>

                <button
                  onClick={() => deleteShow(show._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default Show;