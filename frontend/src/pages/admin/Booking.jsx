import { useEffect, useState } from "react";
import API from "../../services/axios";

const Booking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      // Agar admin ke liye dedicated API hai to uska endpoint use karo
      // Example: /admin/bookings
      // Agar nahi hai to apne backend ke hisaab se change kar lena.
      const { data } = await API.get("/admin/bookings");

      setBookings(data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Bookings
        </h1>

        <button
          onClick={fetchBookings}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
        >
          Refresh
        </button>

      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-black text-white">

            <tr>

              <th className="p-4">User</th>

              <th className="p-4">Movie</th>

              <th className="p-4">Theatre</th>

              <th className="p-4">Seats</th>

              <th className="p-4">Amount</th>

              <th className="p-4">Status</th>

            </tr>

          </thead>

          <tbody>

            {bookings.length === 0 ? (

              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10"
                >
                  No Bookings Found
                </td>
              </tr>

            ) : (

              bookings.map((booking) => (

                <tr
                  key={booking._id}
                  className="border-b text-center hover:bg-gray-50"
                >

                  <td className="p-4">
                    {booking.user?.name || "-"}
                  </td>

                  <td className="p-4">
                    {booking.movie?.title || "-"}
                  </td>

                  <td className="p-4">
                    {booking.theatre?.name || "-"}
                  </td>

                  <td className="p-4">
                    {booking.seats?.join(", ")}
                  </td>

                  <td className="p-4">
                    ₹{booking.totalAmount}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {booking.paymentStatus}
                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Booking;