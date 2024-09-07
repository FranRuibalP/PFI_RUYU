import React from 'react';
import dynamic from 'next/dynamic';
import { Box, Grid, Typography, Divider } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

// Cargar ReactApexChart dinámicamente
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Generos() {
  const [genresScores, setGenresScores] = useState([]);
  const asyncGetGenresScores = async () => {
    try {
      const response = await axios.get('http://localhost:5000/predict-genres-model');
      console.log(response.data);
      setGenresScores(response.data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }
  useEffect(() => {
    asyncGetGenresScores();
  }, []);
  const chartOptions = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: [
        'Acción', 'Aventura', 'Casual', 'Early Access', 'Free to Play',
        'Indie', 'RPG', 'Racing', 'Simulation', 'Sports', 'Strategy'
      ],
    },
    title: {
      text: 'Popularidad de Géneros del Próximo Año',
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    yaxis: {
      title: {
        text: 'Popularidad (1-4)',
      },
    },
    plotOptions: {
        bar: {
          distributed: true
        }
      },  
  };

  const chartSeries = [
    {
      name: 'Popularidad',
      data: genresScores, // Valores de popularidad entre 1 y 4
    },
  ];
  
  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        {/* Título y Divisor */}
        <Grid item xs={12}>
          <Typography variant="h4"><a onClick={asyncGetGenresScores}>Predicción de Géneros</a></Typography>
          <Divider sx={{ marginY: 2 }} />
        </Grid>
        {/* Gráfico de Barras */}
        <Grid item xs={12}>
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={600}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
