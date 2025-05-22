import React, { useState } from 'react';
import './app.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = '64ef7a2efe22c059928eb61cfa39268d'; // Replace with your OpenWeatherMap API key

  const getWeather = async (e) => {
    e.preventDefault();
  
    const cleanCity = city.trim();
    if (!cleanCity) return;
  
    setLoading(true);
    setError('');
    setWeather(null);
  
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cleanCity)}&appid=${API_KEY}&units=metric`
      );
  
      const data = await res.json();
      console.log(data); // place this right after 'const data = await res.json();'
      if (data.cod !== 200) {
        throw new Error(data.message); // Will show 'city not found'
      }
  
      setWeather(data);
    } catch (err) {
      setError(err.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>🌤️ Weather Dashboard</h1>
      <form onSubmit={getWeather}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
