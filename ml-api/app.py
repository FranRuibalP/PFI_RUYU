# app.py (Flask API)
from flask import Flask, request, jsonify
import joblib  # Usado para cargar modelos preentrenados
import numpy as np
import pandas as pd
from datetime import datetime

app = Flask(__name__)
# Lista de géneros posibles
all_genres = [
    'Action', 'Adventure', 'Casual', 'Early Access', 'Education',
    'Free to Play', 'Indie','Massively Multiplayer', 'RPG', 'Racing', 'Simulation',
    'Sports', 'Strategy'
]
# Cargar el modelo de machine learning previamente entrenado
# Reemplaza 'modelo_entrenado.pkl' con el nombre de tu archivo de modelo
salesModel = joblib.load('models/model_best_stacking.pkl')
hitsModel = joblib.load('models/modelo_hits.pkl')
def extract_year_and_season(date_str):
    # Convertir la cadena de fecha a un objeto datetime
    date_obj = datetime.fromisoformat(date_str.replace('Z', '+00:00'))

    # Extraer el año
    year = date_obj.year

    # Determinar la temporada
    month = date_obj.month
    if month in [12, 1, 2]:
        season = 'Winter'
    elif month in [3, 4, 5]:
        season = 'Spring'
    elif month in [6, 7, 8]:
        season = 'Summer'
    elif month in [9, 10, 11]:
        season = 'Fall'
    else:
        season = 'Unknown'  # En caso de que el mes no sea válido

    return year, season

@app.route('/predict-sales-model', methods=['POST'])
def predictSales():
   
    # Obtener los datos de la solicitud POST
    data = request.get_json()

    # Extraer los datos necesarios del JSON
    price = float(data.get('price'))
    reviews = int(data.get('reviews'))
    reviewScore = float(data.get('score'))
    
    publishers = data.get('publisher')
    avg_publisher_copies = 0
    # Convertir la lista de géneros a un diccionario con 1s y 0s
    genres = {genre: (1 if genre in data.get('genres') else 0) for genre in all_genres}
    year, season = extract_year_and_season(data.get('releaseDate'))
    
    print(genres)
    

    # Preprocesar los datos según sea necesario (esto depende de cómo entrenaste tu modelo)
    # Por ejemplo, podrías necesitar transformar los géneros en un vector binario
    input_data = pd.DataFrame({
    'price': [price],
    'reviews': [reviews],
    'reviewScore': [reviewScore],
    'publishers': [publishers],
    'avg_publisher_copies': [avg_publisher_copies],
    'year': [year],
    'season': [season],
    **genres
})
    # Realizar la predicción
    predicted_copies_sold = salesModel.predict(input_data)
    # Convertir el resultado a un tipo de datos básico
    predicted_copies_sold = predicted_copies_sold.tolist()
    # Devolver la predicción en formato JSON
    return jsonify({'sales': predicted_copies_sold})

@app.route('/predict-hits-model', methods=['POST'])
def predictHits():
   
    # Obtener los datos de la solicitud POST
    data = request.get_json()

    # Extraer los datos necesarios del JSON
    price = float(data.get('price'))
    reviews = int(data.get('reviews'))
    reviewScore = float(data.get('score'))
    
    publishers = data.get('publisher')
    avg_publisher_copies = 95000
    # Convertir la lista de géneros a un diccionario con 1s y 0s
    genres = {genre: (1 if genre in data.get('genres') else 0) for genre in all_genres}
    year, season = extract_year_and_season(data.get('releaseDate'))
    
    print(genres)
    #get todays year only



    # Preprocesar los datos según sea necesario (esto depende de cómo entrenaste tu modelo)
    # Por ejemplo, podrías necesitar transformar los géneros en un vector binario
    input_data = pd.DataFrame({
    'price': [price],
    'reviews': [reviews],
    'reviewScore': [reviewScore],
    'publishers': [publishers],
    'avg_publisher_copies': [avg_publisher_copies],
    'year': [year],
    'season': [season],
    'years_since_release': [datetime.now().year - year],
    **genres
})
    print(input_data)
    # Realizar la predicción
    predicted_hits = hitsModel.predict_proba(input_data)
    print(predicted_hits)
    # Convertir el resultado a un tipo de datos básico
    predicted_hits = predicted_hits.tolist()
    
    # Devolver la predicción en formato JSON
    return jsonify({'hits': predicted_hits})
if __name__ == '__main__':
    app.run(debug=True, port=5000)