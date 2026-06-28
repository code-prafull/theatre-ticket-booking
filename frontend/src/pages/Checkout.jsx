import { Box, Container, Paper, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/shared/Navbar";
import BookingSummary from "../components/booking/BookingSummary";
import Button from "../components/shared/Button";

import { createBooking } from "../services/booking";

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <>
        <Navbar />
        <Container sx={{ mt: 5 }}>
          <Typography>No Booking Found</Typography>
        </Container>
      </>
    );
  }

  const handleCheckout = async () => {
  try {
    const { data } = await createBooking({
      showId: show._id,
      seats,
    });

    toast.success("Booking Created");

    navigate("/payment", {
      state: {
        booking: data.data,
        show,
      },
    });

  } catch (err) {
    toast.error(err.response?.data?.message);
  }
};

  const { show, seats, total } = state;

  return (
    <>
      <Navbar />

      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" mb={3}>
            Checkout
          </Typography>

          <BookingSummary
            movie={show.movie?.title}
            theatre={show.theatre?.name}
            seats={seats}
            total={total}
          />

          <Box mt={4}>
           <Button
  fullWidth
  onClick={handleCheckout}
>
  Proceed To Payment
</Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Checkout;