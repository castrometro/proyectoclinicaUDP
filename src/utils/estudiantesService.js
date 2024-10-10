const ESTUDIANTES_STORAGE_KEY = 'estudiantes';

export const getEstudiantes = () => {
  const storedEstudiantes = localStorage.getItem(ESTUDIANTES_STORAGE_KEY);
  if (storedEstudiantes) {
    return JSON.parse(storedEstudiantes);
  }
  return [];
};

export const addEstudiante = (estudiante) => {
  const estudiantes = getEstudiantes();
  const newId = estudiantes.length > 0 ? Math.max(...estudiantes.map(e => e.id)) + 1 : 1;
  const newEstudiante = { ...estudiante, id: newId };
  estudiantes.push(newEstudiante);
  localStorage.setItem(ESTUDIANTES_STORAGE_KEY, JSON.stringify(estudiantes));
  return newEstudiante;
};

export const updateEstudiante = (estudiante) => {
  const estudiantes = getEstudiantes();
  const index = estudiantes.findIndex(e => e.id === estudiante.id);
  if (index !== -1) {
    estudiantes[index] = estudiante;
    localStorage.setItem(ESTUDIANTES_STORAGE_KEY, JSON.stringify(estudiantes));
  }
  return estudiante;
};

export const deleteEstudiante = (id) => {
  const estudiantes = getEstudiantes();
  const newEstudiantes = estudiantes.filter(e => e.id !== id);
  localStorage.setItem(ESTUDIANTES_STORAGE_KEY, JSON.stringify(newEstudiantes));
};