const createSeatLayout = () => {
  const rows = "ABCDEFGHIJ";

  const seats = [];

  for (let row of rows) {
    for (let i = 1; i <= 10; i++) {
      seats.push(`${row}${i}`);
    }
  }

  return seats;
};

export default createSeatLayout;