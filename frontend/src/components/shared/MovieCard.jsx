import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardMedia
        component="img"
        height="320"
        image={movie.poster}
        alt={movie.title}
      />

      <CardContent>
        <Typography variant="h6">
          {movie.title}
        </Typography>

        <Typography color="text.secondary">
          {movie.language}
        </Typography>

        <Button
        onClick={() => navigate(`/movies/${movie._id}`)}
          fullWidth
          sx={{ mt: 2 }}
          variant="contained"
          onClick={() =>
            navigate(`/movies/${movie._id}`)
          }
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
    
  );
};

export default MovieCard;