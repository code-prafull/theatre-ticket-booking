import {
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

const PaymentCard = ({
  amount,
  onPay,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">
          Total Amount
        </Typography>

        <Typography
          variant="h4"
          my={2}
        >
          ₹{amount}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          onClick={onPay}
        >
          Pay Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentCard;