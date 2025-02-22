import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '../App.jsx'
import React from "react";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

const Home = () => {
  return (
      <div>
          <h1>Homepage</h1>
      </div>
  );
};

export default Home;