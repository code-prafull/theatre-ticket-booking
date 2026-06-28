import { useEffect, useState } from "react";


import API from "../../services/axios";

import AdminLayout from "../../components/admin/AdminLayout";
import StatsCard from "../../components/admin/StatsCard";

const Dashboard = () => {

  const [stats, setStats] = useState({
    movies: 0,
    theatres: 0,
    shows: 0,
    bookings: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {

    try {

      const [movies, theatres, shows] =
        await Promise.all([
          API.get("/movies"),
          API.get("/theatres"),
          API.get("/shows"),
        ]);

      setStats({
        movies: movies.data.count || movies.data.data.length,
        theatres:
          theatres.data.count ||
          theatres.data.data.length,
        shows:
          shows.data.count ||
          shows.data.data.length,
        bookings: 0,
      });

    } catch (err) {

      console.log(err);

    }

  };

  return (
    <AdminLayout>

      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatsCard
          title="Movies"
          value={stats.movies}
          color="bg-red-500"
        />

        <StatsCard
          title="Theatres"
          value={stats.theatres}
          color="bg-blue-500"
        />

        <StatsCard
          title="Shows"
          value={stats.shows}
          color="bg-green-500"
        />

        <StatsCard
          title="Bookings"
          value={stats.bookings}
          color="bg-yellow-500"
        />

      </div>

    </AdminLayout>
  );
};

export default Dashboard;