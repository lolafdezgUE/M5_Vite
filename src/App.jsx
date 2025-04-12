// App.jsx
import { Routes, Route } from 'react-router-dom';
import './App.css';
import PaginaPrincipal from './components/PaginaPrincipal';
import DetallePelicula from './components/DetallePelicula';
import Buscador from './components/Buscador';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PaginaPrincipal />} />
      <Route path="/pelicula/:id" element={<DetallePelicula />} />
      <Route path="/buscador/" element={<Buscador />} />
    </Routes>
  );
}

export default App;

