const DOCENTES_STORAGE_KEY = 'docentes';

export const getDocentes = () => {
  const storedDocentes = localStorage.getItem(DOCENTES_STORAGE_KEY);
  if (storedDocentes) {
    return JSON.parse(storedDocentes);
  }
  return [];
};

export const addDocente = (docente) => {
  const docentes = getDocentes();
  const newId = docentes.length > 0 ? Math.max(...docentes.map(d => d.id)) + 1 : 1;
  const newDocente = { ...docente, id: newId };
  docentes.push(newDocente);
  localStorage.setItem(DOCENTES_STORAGE_KEY, JSON.stringify(docentes));
  return newDocente;
};

export const updateDocente = (docente) => {
  const docentes = getDocentes();
  const index = docentes.findIndex(d => d.id === docente.id);
  if (index !== -1) {
    docentes[index] = docente;
    localStorage.setItem(DOCENTES_STORAGE_KEY, JSON.stringify(docentes));
  }
  return docente;
};

export const deleteDocente = (id) => {
  const docentes = getDocentes();
  const newDocentes = docentes.filter(d => d.id !== id);
  localStorage.setItem(DOCENTES_STORAGE_KEY, JSON.stringify(newDocentes));
};