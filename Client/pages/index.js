import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Container,Paper, Divider, Typography, Button, Menu, MenuItem, Card, CardMedia, CardContent, Grid, colors } from '@mui/material';
import Header from '../components/Header';


const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Home() {
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Datos para el gráfico de ventas
  const [series] = useState([
    {
      name: 'Bō: Path of the Teal Lotus',
      data: [
        14036, 14230, 14387, 14518, 14647, 14788, 14912, 15026, 15109, 15230, 15465, 15681, 15822, 15988, 16129, 16232, 
        16349, 16444, 16500, 16595, 16766, 16964, 17044, 17139, 17236, 17314, 17402, 17506, 17605, 17684
      ]
    },
    {
      name: 'Gestalt: Steam & Cinder',
      data: [
        16243, 16345, 16461, 16565, 16734, 16836, 16934, 17033, 17136, 17262, 17385, 17512, 17601, 17678, 17705, 17768,
        17819, 17908, 18000, 18119, 18175, 18264, 18320, 18338, 18410, 18477, 18571, 18650, 18697, 18744
      ]
    },
    {
      name: 'Prince of Persia The Lost Crown',
      data: [
        15984, 17419, 18973, 20260, 21651, 23107, 24730, 26367, 28176, 28903, 29074, 29186, 29291, 29383, 29462, 29555,
        29648, 29751, 29860, 29955, 30010, 30104, 30208, 30290, 30386, 30483, 30572, 30661, 30763, 30849
      ]
    },
    {
      name: 'Crypt Custodian',
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 566, 3082, 4746, 5775, 6671, 7612, 8491, 9155, 9635, 10074, 10552, 10975,
        11478, 12184, 12527, 12727
      ]
    }
  ]);

  const [options] = useState({
    chart: {
      type: 'line',
      height: 400,
      width: '100%',
    },
    title: {
      text: 'Ventas de competidores en el último mes',
      align: 'left',
    },
    xaxis: {
      categories: [
        '13 Aug', '14 Aug', '15 Aug', '16 Aug', '17 Aug', '18 Aug', '19 Aug', '20 Aug', '21 Aug', '22 Aug',
        '23 Aug', '24 Aug', '25 Aug', '26 Aug', '27 Aug', '28 Aug', '29 Aug', '30 Aug', '31 Aug', '01 Sep',
        '02 Sep', '03 Sep', '04 Sep', '05 Sep', '06 Sep', '07 Sep', '08 Sep', '09 Sep', '10 Sep', '11 Sep'
      ]
    },
    yaxis: {
      title: {
        text: 'Ventas (en miles)',
      },
    },
  });

  // Datos para el gráfico circular de reseñas
  const [reviewsSeries] = useState([82, 18 ]); 
  const [reviewsOptions] = useState({
    chart: {
      type: 'donut',
    },
    labels: ['Positivas', 'Negativas'],
    colors: ['#00E396', '#FF6178'],
    title: {
      text: 'Porcentaje de Reseñas',
      align: 'left',
    },
  });

  // Información de los juegos para las tarjetas
  const games = [
    {
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2751000/header.jpg',
      title: 'Prince of Persia The Lost Crown',
      genres: ['Action', 'Adventure'],
      ventas: '30.9k',
      reviews: '81%',
      publisher: 'Ubisoft',
      precio: '$39.99',
      releaseDate: 'Fri Aug 09 2024',
    },
    {
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1231990/header.jpg', // Imagen de ejemplo
      title: 'Gestalt: Steam & Cinder',
      genres: ['Action', 'Adventure', 'Indie', 'RPG'],
      ventas: '18.8k',
      reviews: '82%',
      publisher: 'Fireshine Games',
      precio: '$19.99',
      releaseDate: 'Wed Jul 17 2024',
    },
    {
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1614440/header.jpg',
      title: 'Bō: Path of the Teal Lotus',
      genres: ['Action', 'Adventure', 'Indie'],
      ventas: '17.7k',
      reviews: '81%',
      publisher: 'Humble Games',
      precio: '$19.99',
      releaseDate: 'Wed Jul 17 2024',
    },
    {
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2394650/header.jpg',
      title: 'Crypt Custodian',
      genres: ['Adventure'],
      ventas: '12.9k',
      reviews: '98%',
      publisher: ' Top Hat Studios',
      precio: '$19.99',
      releaseDate: 'Tue Aug 27 2024',
    },
  ];

  return (
    <>
      
      <Container maxWidth={false} style={{ marginTop: '2rem' }}>
        {/* Título */}
        <Typography variant="h3" gutterBottom>
          Bienvenido Usuario
        </Typography>

        {/* Botón con menú desplegable */}
        <Button
          variant="contained"
          aria-controls={open ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          style={{ marginBottom: '2rem' }}
        >
          Seleccionar Juego
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Juego A</MenuItem>
          <MenuItem onClick={handleClose}>Juego B</MenuItem>
          <MenuItem onClick={handleClose}>Juego C</MenuItem>
        </Menu>
         {/* Divider */}
         <Divider style={{ marginBottom: '1rem' }} />

          {/* Subtítulo con el nombre del juego */}
          <Typography variant="h4" gutterBottom>
            Gestalt: Steam & Cinder
          </Typography>

          {/* Cards con estadísticas del juego */}
          <Grid container spacing={2} style={{ marginBottom: '2rem' }}>
            <Grid item xs={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Ventas Totales</Typography>
                  <Typography variant="body1">18.8k</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Wishlist</Typography>
                  <Typography variant="body1">12k</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Reviews</Typography>
                  <Typography variant="body1">748</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Jugadores Concurrentes</Typography>
                  <Typography variant="body1">32</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

         {/* Gráficos */}
         <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper
              elevation={3}
              style={{ padding: '1rem', borderRadius: '15px', backgroundColor: 'white' }}
            >
              <Chart options={options} series={series} type="line" height={400} />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper
              elevation={3}
              style={{ padding: '1rem', borderRadius: '15px', backgroundColor: 'white' }}
            >
              <Chart options={reviewsOptions} series={reviewsSeries} type="donut" height={400} />
            </Paper>
          </Grid>
        </Grid>

        {/* Tarjetas de juegos */}
        <Grid container spacing={2} style={{ marginTop: '2rem' }}>
          {games.map((game, index) => (
            <Grid item xs={12} key={index}>
              <Card style={{ display: 'flex', backgroundColor:'white' }}>
                <CardMedia
                  component="img"
                  style={{ width: 350 , borderRadius: '5px' }}
                  image={game.image}
                  alt={game.title}
                />
                <CardContent>
                  <Typography variant="h6">{game.title}</Typography>
                  <Typography variant="body2">Publisher: {game.publisher}</Typography>
                  <Typography variant="body2">Ventas: {game.ventas}</Typography>
                  <Typography variant="body2">Puntaje de Reviews: {game.reviews}</Typography>
                  <Typography variant="body2">Precio: {game.precio}</Typography>
                  <Typography variant="body2">Precio: {game.releaseDate}</Typography>

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
