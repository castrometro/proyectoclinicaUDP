import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import IniciarSesion from './pages/IniciarSesion';
import MenuAdmin from './pages/MenuAdmin';
import GestionPacientes from './pages/GestionPacientes';
import FichaPaciente from './pages/FichaPaciente';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/admin-menu" element={<MenuAdmin />} />
        <Route path="/gestion-pacientes" element={<GestionPacientes />} />
        <Route path="/ficha-paciente/:rut" element={<FichaPaciente />} />
      </Routes>
    </Router>
  );
}

export default App;