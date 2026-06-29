// File Path: utils/createSeatLayout.js
const createSeatLayout = () => {
  const seats = [];
  const topRows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const bottomRows = ["J", "K", "L", "M"];

  // Top rows have 10 seats each
  topRows.forEach((row) => {
    for (let i = 1; i <= 10; i++) {
      seats.push(`${row}${i}`);
    }
  });

  // Bottom rows have 12 seats each
  bottomRows.forEach((row) => {
    for (let i = 1; i <= 12; i++) {
      seats.push(`${row}${i}`);
    }
  });

  return seats;
};

export default createSeatLayout;