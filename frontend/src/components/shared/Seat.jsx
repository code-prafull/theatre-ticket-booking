import { Button } from "@mui/material";

const Seat = ({
  seat,
  selected,
  booked,
  onClick,
}) => {
  return (
    <Button
      variant={
        booked
          ? "contained"
          : selected
          ? "outlined"
          : "text"
      }
      color={booked ? "error" : "success"}
      onClick={onClick}
      disabled={booked}
      sx={{
        minWidth: 50,
        m: 0.5,
      }}
    >
      {seat}
    </Button>
  );
};

export default Seat;