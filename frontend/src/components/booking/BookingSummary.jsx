import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const BookingSummary = ({
  movie,
  theatre,
  seats,
  total,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          Booking Summary
        </Typography>

        <Typography>
          Movie: {movie}
        </Typography>

        <Typography>
          Theatre: {theatre}
        </Typography>

        <Typography>
          Seats: {seats.join(", ")}
        </Typography>

        <Typography
          variant="h6"
          mt={2}
        >
          Total ₹{total}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookingSummary;