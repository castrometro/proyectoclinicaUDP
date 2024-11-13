import React from 'react';
import './fonts.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import IniciarSesion from './pages/IniciarSesion';
import MenuAdmin from './pages/MenuAdmin';
import GestionPacientes from './pages/GestionPacientes';
// import FichaPaciente from './pages/FichaPaciente';
import GestionDocentes from './pages/GestionDocentes';
import GestionEstudiantes from './pages/GestionEstudiantes';
import GestionAdministrador from './pages/GestionAdministrador';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/admin-menu" element={<MenuAdmin />} />
        <Route path="/gestion-pacientes" element={<GestionPacientes />} />
        {/* <Route path="/ficha-paciente/:rut" element={<FichaPaciente />} /> */}
        <Route path="/gestion-docentes" element={<GestionDocentes />} />
        <Route path="/gestion-estudiantes" element={<GestionEstudiantes />} />
        <Route path="/gestion-administrador" element={<GestionAdministrador />} />
        <Route path="/logout" element={<h1>Cerrando sesión...</h1>} />
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;