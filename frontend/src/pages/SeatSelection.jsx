import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import API from "../services/axios";

import createSeatLayout from "../utils/createSeatLayout";

import Navbar from "../components/shared/Navbar";
 import Loader from "../components/shared/Loader";
  import Seat from "../components/shared/Seat";
   import BookingSummary from "../components/booking/BookingSummary";

const SeatSelection = () => {
  const { showId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const allSeats = createSeatLayout();

  useEffect(() => {
    fetchShow();
  }, []);

  const fetchShow = async () => {
    try {
      const { data } = await API.get(`/shows/${showId}`);

      setShow(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats((prev) =>
        prev.filter((item) => item !== seat)
      );
    } else {
      setSelectedSeats((prev) => [...prev, seat]);
    }
  };

  if (loading) return <Loader />;

  const total = selectedSeats.length * show.ticketPrice;

  return (
    <>
      <Navbar />

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={4}
        >
          Select Your Seats
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 4,
          }}
        >
          <Box
            sx={{
              width: "70%",
              height: 10,
              bgcolor: "#ccc",
              borderRadius: 10,
            }}
          />
        </Box>

        <Typography
          align="center"
          mb={4}
        >
          SCREEN
        </Typography>

        <Grid
          container
          spacing={1}
          justifyContent="center"
        >
          {allSeats.map((seat) => (
            <Grid item key={seat}>
              <Seat
                seat={seat}
                booked={show.bookedSeats.includes(seat)}
                selected={selectedSeats.includes(seat)}
                onClick={() => toggleSeat(seat)}
              />
            </Grid>
          ))}
        </Grid>

        <Box mt={5}>
          <BookingSummary
            movie={show.movie?.title || ""}
            theatre={show.theatre?.name || ""}
            seats={selectedSeats}
            total={total}
          />
        </Box>

        <Box
          mt={4}
          display="flex"
          justifyContent="flex-end"
        >
          <Button
            disabled={selectedSeats.length === 0}
            onClick={() =>
              navigate("/checkout", {
                state: {
                  show,
                  seats: selectedSeats,
                  total,
                },
              })
            }
          >
            Continue
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default SeatSelection;