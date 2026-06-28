import { Container, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";



import Navbar from "../components/shared/Navbar";
import PaymentCard from "../components/payment/PaymentCard";
import {
  createOrder,
  verifyPayment,
} from "../services/paymentApi";

const Payment = () => {
  const { state } = useLocation();

  if (!state) {
    return (
      <>
        <Navbar />
        <Container sx={{ mt: 5 }}>
          <Typography>No Payment Data</Typography>
        </Container>
      </>
    );
  }

const { booking, show } = state;

 const handlePay = async () => {
  try {
    const { data } = await createOrder(booking._id);

    const options = {
      key: data.key,

      amount: data.order.amount,

      currency: data.order.currency,

      name: "Movie Ticket Booking",

      description: "Movie Booking",

      order_id: data.order.id,

      handler: async function (response) {
        await verifyPayment({
          bookingId: booking._id,

          razorpay_order_id:
            response.razorpay_order_id,

          razorpay_payment_id:
            response.razorpay_payment_id,

          razorpay_signature:
            response.razorpay_signature,
        });

        alert("Payment Successful");

        navigate("/my-bookings");
      },

      theme: {
        color: "#1976d2",
      },
    };

    const razor = new window.Razorpay(options);

    razor.open();
  } catch (error) {
    console.log(error);
  }
};

  return (
    <>
      <Navbar />

      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" mb={3}>
            Payment
          </Typography>

          <PaymentCard
    amount={booking.totalAmount}
    onPay={handlePay}
/>
        </Paper>
      </Container>
    </>
  );
};

export default Payment;