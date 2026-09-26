import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import React from './pages/React';
import JavaScript from './pages/JavaScript';
import Classes from './pages/Classes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<React />} />
        <Route path="/react" element={<React />} />
        <Route path="/javascript" element={<JavaScript />} />
        <Route path="/classes" element={<Classes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
