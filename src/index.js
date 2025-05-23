import React from 'react'; // Import the React library (needed to use JSX)
import ReactDOM from 'react-dom/client'; // Import ReactDOM to render components to the page
import './app.css'; // Import global CSS styles
import App from './app'; // Import the main App component

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root in the Document Object Model using the div with id="root"
root.render(<App />); // Render the App component inside the root element
