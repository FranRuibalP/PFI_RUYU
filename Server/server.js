const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;


//Requests
app.post('/predict-sales', async (req, res) => {
  const { publisher, reviews, score, price, genres, releaseDate } = req.body;

  try {
    const response = await axios.post('http://localhost:5000/predict-sales-model', {
      publisher,
      reviews,
      score,
      price,
      genres,
      releaseDate,
    });

    const salesPrediction = response.data.sales;
    const estimatedRevenue = salesPrediction * price;

    res.json({ sales: salesPrediction, revenue: estimatedRevenue });
  } catch (error) {
    console.error('Error al conectarse con el modelo:', error);
    res.status(500).json({ error: 'Error al procesar la predicción' });
  }
});

app.get('/genres-scores', async (req, res) => {
  try {
    res.json([
      5.00, 4.80, 4.57, 4.19, 4.19, 4.19, 3.71, 3.71, 3.43, 3.19, 1.00
    ]);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
}
);

app.post('/predict-hits', async (req, res) => {
  const { publisher, reviews, score, price, genres, releaseDate } = req.body;

  try {
    const response = await axios.post('http://localhost:5000/predict-hits-model', {
      publisher,
      reviews,
      score,
      price,
      genres,
      releaseDate,
    });

    const hitsPrediction = response.data.hits;


    res.json({ hitProb: hitsPrediction});
  } catch (error) {
    console.error('Error al conectarse con el modelo:', error);
    res.status(500).json({ error: 'Error al procesar la predicción' });
  }
});
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
