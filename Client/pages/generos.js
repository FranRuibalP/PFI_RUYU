import React from 'react';
import dynamic from 'next/dynamic';
import { Box, Grid, Typography, Divider, Paper } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import config from '../config';

// Cargar ReactApexChart dinámicamente
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
export default function Generos() {
  const [genresScores, setGenresScores] = useState([]);
  const [genresScoresLabels, setGenresScoresLabels] = useState([]);
  const asyncGetGenresScores = async () => {
    try {
      const response = await axios.get('http://' + config.apiIP + '/predict-genres-model');
      const data = response.data;
      const uniqueGenres = [...new Set(data.map(item => item.genre))];
      const popularities = data.map(item => parseFloat(item.defuzzified_popularity).toFixed(2));

      setGenresScoresLabels(uniqueGenres);
       
       const minPopularity = Math.min(...popularities);
       const maxPopularity = Math.max(...popularities);

       // Escala los valores de popularidad a un rango de 1 a 4
       const scaledPopularities = popularities.map(value => 
           (1 + 3 * (value - minPopularity) / (maxPopularity - minPopularity)).toFixed(2)
       );
       setGenresScores(scaledPopularities);

      //console.log('Géneros únicos:', uniqueGenres);
      //console.log('Popularidad:', popularities);
      
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
      categories:genresScoresLabels,
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
        text: 'Popularidad',
      },
      min: 0,
      max: 4,
      tickAmount: 4,
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
      data: genresScores, 
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
        <Paper
              elevation={3}
              style={{ padding: '1rem', borderRadius: '15px', backgroundColor: 'white' }}
            >
              <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={600}
            />
            </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
