import pacientesData from '../data/pacientes.json';
import atencionesData from '../data/atenciones.json';

const PACIENTES_STORAGE_KEY = 'pacientes';
const ATENCIONES_STORAGE_KEY = 'atenciones';

// Funciones para pacientes
export const getPacientes = () => {
  const storedPacientes = localStorage.getItem(PACIENTES_STORAGE_KEY);
  if (storedPacientes) {
    return JSON.parse(storedPacientes);
  }
  localStorage.setItem(PACIENTES_STORAGE_KEY, JSON.stringify(pacientesData));
  return pacientesData;
};

export const addPaciente = (paciente) => {
  const pacientes = getPacientes();
  const newId = pacientes.length > 0 ? Math.max(...pacientes.map(p => p.id)) + 1 : 1;
  const newPaciente = { ...paciente, id: newId };
  pacientes.push(newPaciente);
  localStorage.setItem(PACIENTES_STORAGE_KEY, JSON.stringify(pacientes));
  return newPaciente;
};

export const updatePaciente = (paciente) => {
  const pacientes = getPacientes();
  const index = pacientes.findIndex(p => p.id === paciente.id);
  if (index !== -1) {
    pacientes[index] = paciente;
    localStorage.setItem(PACIENTES_STORAGE_KEY, JSON.stringify(pacientes));
  }
  return paciente;
};

export const deletePaciente = (id) => {
  const pacientes = getPacientes();
  const newPacientes = pacientes.filter(p => p.id !== id);
  localStorage.setItem(PACIENTES_STORAGE_KEY, JSON.stringify(newPacientes));
};

// Funciones para atenciones
export const getAtenciones = () => {
  const storedAtenciones = localStorage.getItem(ATENCIONES_STORAGE_KEY);
  if (storedAtenciones) {
    return JSON.parse(storedAtenciones);
  }
  localStorage.setItem(ATENCIONES_STORAGE_KEY, JSON.stringify(atencionesData));
  return atencionesData;
};

export const getAtencionesByPaciente = (rut) => {
  const atenciones = getAtenciones();
  return atenciones.filter(atencion => atencion.pacienteRut === rut);
};

export const addAtencion = (atencion) => {
  const atenciones = getAtenciones();
  const newId = atenciones.length > 0 ? Math.max(...atenciones.map(a => a.id)) + 1 : 1;
  const newAtencion = { ...atencion, id: newId };
  atenciones.push(newAtencion);
  localStorage.setItem(ATENCIONES_STORAGE_KEY, JSON.stringify(atenciones));
  return newAtencion;
};

export const updateAtencion = (atencion) => {
  const atenciones = getAtenciones();
  const index = atenciones.findIndex(a => a.id === atencion.id);
  if (index !== -1) {
    atenciones[index] = atencion;
    localStorage.setItem(ATENCIONES_STORAGE_KEY, JSON.stringify(atenciones));
  }
  return atencion;
};

export const deleteAtencion = (id) => {
  const atenciones = getAtenciones();
  const newAtenciones = atenciones.filter(a => a.id !== id);
  localStorage.setItem(ATENCIONES_STORAGE_KEY, JSON.stringify(newAtenciones));
};