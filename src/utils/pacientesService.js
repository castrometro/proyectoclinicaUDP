import pacientesData from '../data/pacientes.json';

const STORAGE_KEY = 'pacientes';

export const getPacientes = () => {
  const storedPacientes = localStorage.getItem(STORAGE_KEY);
  if (storedPacientes) {
    return JSON.parse(storedPacientes);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pacientesData));
  return pacientesData;
};

export const addPaciente = (paciente) => {
  const pacientes = getPacientes();
  const newId = pacientes.length > 0 ? Math.max(...pacientes.map(p => p.id)) + 1 : 1;
  const newPaciente = { ...paciente, id: newId };
  pacientes.push(newPaciente);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pacientes));
  return newPaciente;
};

export const updatePaciente = (paciente) => {
  const pacientes = getPacientes();
  const index = pacientes.findIndex(p => p.id === paciente.id);
  if (index !== -1) {
    pacientes[index] = paciente;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pacientes));
  }
  return paciente;
};

export const deletePaciente = (id) => {
  const pacientes = getPacientes();
  const newPacientes = pacientes.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newPacientes));
};