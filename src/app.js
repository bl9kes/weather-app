import React, { useState } from 'react'; // Import React and the useState hook
import './app.css'; // Import global styles

function App() {
  // React state to hold the city input, weather data, loading state, and error message
  const [city, setCity] = useState(''); // Stores the city name input by the user
  const [weather, setWeather] = useState(null); // Stores fetched weather data
  const [loading, setLoading] = useState(false); // Tracks loading state
  const [error, setError] = useState(''); // Stores error messages

  const API_KEY = process.env.REACT_APP_API_KEY; // Your OpenWeatherMap API key

  // Function that runs when the form is submitted
  const getWeather = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    const cleanCity = city.trim(); // Trim whitespace from input
    if (!cleanCity) return; // If empty, exit

    setLoading(true); // Start loading
    setError(''); // Clear old errors
    setWeather(null); // Clear old weather data

    try {
      // Make API request to OpenWeatherMap
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cleanCity)}&appid=${API_KEY}&units=metric`
      );

      const data = await res.json(); // Parse JSON response
      console.log(data); // Log data for debugging

      if (data.cod !== 200) {
        throw new Error(data.message); // Throw error if city is not found
      }

      setWeather(data); // Save the weather data to state
    } catch (err) {
      setError(err.message || 'Error fetching data'); // Handle errors
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="App"> {/* Main container */}
      <h1>🌤️ Weather Dashboard</h1>

      {/* Search form */}
      <form onSubmit={getWeather}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)} // Update city state on input change
        />
        <button type="submit">Search</button>
      </form>

      {/* Conditional rendering based on state */}
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* Show weather card only if data is available */}
      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2> {/* City name */}
          <p>{weather.weather[0].description}</p> {/* Weather description */}
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App; // Export the App component
