import { useState } from 'react';
import { TextField, MenuItem, Button, Grid, Box, Autocomplete, Typography, Divider, IconButton, Menu, MenuItem as MUIMenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MoreVertIcon from '@mui/icons-material/HelpOutline';
import axios from 'axios';
import { set } from 'date-fns';

export default function Ventas() {
  const [publisher, setPublisher] = useState('');
  const [reviews, setReviews] = useState('');
  const [score, setScore] = useState('');
  const [price, setPrice] = useState('');
  const [genres, setGenres] = useState([]);
  const [releaseDate, setReleaseDate] = useState(null);
  const [predictedSales, setPredictedSales] = useState('');
  const [estimatedEarnings, setEstimatedEarnings] = useState('');

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const publishers = ['Sony', 'Microsoft', 'Nintendo', 'Ubisoft', 'EA', 'Activision']; // Ejemplo de opciones
  const availableGenres = [
    'Action', 'Adventure', 'Casual', 'Early Access', 'Free to Play',
    'Indie', 'RPG', 'Racing', 'Simulation', 'Sports', 'Strategy'
  ]; // Ejemplo de géneros

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      publisher,
      reviews,
      score,
      price,
      genres,
      releaseDate,
    };
    //console.log('Enviando datos:', { publisher, reviews, score, price, genres, releaseDate });

    try {
      const response = await axios.post('http://localhost:3001/predict-sales', data);
      const { sales, revenue } = response.data;
      setPredictedSales(sales);
      setEstimatedEarnings(revenue);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Predicción de Ventas</Typography>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
          >
            <MUIMenuItem onClick={handleClose}>
              Instructivo
            </MUIMenuItem>
            <Box sx={{ p: 2 }}>
              <Typography variant="body1">
                1. Selecciona el nombre del publisher desde el menú desplegable.
              </Typography>
              <Typography variant="body1">
                2. Introduce el número de reviews y el puntaje de las reviews.
              </Typography>
              <Typography variant="body1">
                3. Especifica el precio del juego y selecciona los géneros.
              </Typography>
              <Typography variant="body1">
                4. Elige la fecha de salida y haz clic en "Enviar".
              </Typography>
              <Typography variant="body1">
                5. La predicción de ventas y las ganancias estimadas se mostrarán en el lado derecho.
              </Typography>
            </Box>
          </Menu>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={3}>
              {/* Mitad Izquierda */}
              <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
                  {/* Publisher */}
                  <Grid item xs={12}>
                    <Autocomplete
                      options={publishers}
                      value={publisher}
                      onChange={(event, newValue) => setPublisher(newValue)}
                      onInputChange={(event, newInputValue) => setPublisher(newInputValue)}
                      renderInput={(params) => (
                        <TextField {...params} label="Nombre del Publisher" variant="outlined" fullWidth />
                      )}
                      freeSolo
                    />
                  </Grid>

                  {/* Número de Reviews */}
                  <Grid item xs={12}>
                    <TextField
                      label="Número de Reviews"
                      type="number"
                      variant="outlined"
                      fullWidth
                      value={reviews}
                      onChange={(e) => setReviews(e.target.value)}
                    />
                  </Grid>

                  {/* Puntaje de Reviews */}
                  <Grid item xs={12}>
                    <TextField
                      label="Puntaje de Reviews (0-100)"
                      type="number"
                      variant="outlined"
                      fullWidth
                      value={score}
                      onChange={(e) => setScore(e.target.value)}
                      inputProps={{ min: 0, max: 100 }}
                    />
                  </Grid>

                  {/* Precio */}
                  <Grid item xs={12}>
                    <TextField
                      label="Precio"
                      type="number"
                      variant="outlined"
                      fullWidth
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      InputProps={{
                        startAdornment: <span>$</span>,
                      }}
                    />
                  </Grid>

                  {/* Géneros */}
                  <Grid item xs={12}>
                    <Autocomplete
                      multiple
                      options={availableGenres}
                      getOptionLabel={(option) => option}
                      value={genres}
                      onChange={(event, newValue) => setGenres(newValue)}
                      renderInput={(params) => (
                        <TextField {...params} label="Géneros" variant="outlined" fullWidth />
                      )}
                    />
                  </Grid>

                  {/* Fecha de Salida */}
                  <Grid item xs={12}>
                    <DatePicker
                      label="Fecha de Salida"
                      value={releaseDate}
                      onChange={(newValue) => setReleaseDate(newValue)}
                      renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
                    />
                  </Grid>

                  {/* Botón de Enviar */}
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                      Enviar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              {/* Mitad Derecha */}
              <Grid item xs={12} md={6}>
                <Box sx={{ paddingLeft: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Resultados
                  </Typography>

                  {/* Predicción de Ventas */}
                  <TextField
                    label="Predicción de Ventas"
                    variant="outlined"
                    fullWidth
                    value={predictedSales}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ marginBottom: 3 }}
                  />

                  {/* Ganancias Estimadas */}
                  <TextField
                    label="Ganancias Estimadas"
                    variant="outlined"
                    fullWidth
                    value={estimatedEarnings}
                    InputProps={{
                      readOnly: true,
                      startAdornment: <span>$</span>,
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}
