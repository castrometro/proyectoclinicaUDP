// Elimina puntos y guiones del RUT
export const sanitizeRut = (rut) => {
  return rut.replace(/[.-]/g, '').toUpperCase();
};

// Valida el dígito verificador de un RUT
export const validateRut = (rut) => {
  const sanitizedRut = sanitizeRut(rut);
  if (sanitizedRut.length < 2) return false;

  const body = sanitizedRut.slice(0, -1); // Todo menos el dígito verificador
  const verifier = sanitizedRut.slice(-1); // Último carácter

  let sum = 0;
  let multiplier = 2;

  // Recorremos el RUT de derecha a izquierda
  for (let i = body.length - 1; i >= 0; i--) {
    sum += multiplier * parseInt(body[i], 10);
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const remainder = 11 - (sum % 11);
  const calculatedVerifier = remainder === 11 ? '0' : remainder === 10 ? 'K' : remainder.toString();

  return calculatedVerifier === verifier;
};

// Formatea el RUT con guion
export const formatRut = (rut) => {
  const sanitizedRut = sanitizeRut(rut);
  const body = sanitizedRut.slice(0, -1); // Todo menos el dígito verificador
  const verifier = sanitizedRut.slice(-1); // Dígito verificador
  return `${body}-${verifier}`; // Devuelve el RUT con guion
};

// Procesa y valida un RUT completo
export const processRut = (rut) => {
  const sanitized = sanitizeRut(rut);
  if (!validateRut(sanitized)) {
    throw new Error('El RUT no es válido.');
  }
  return formatRut(sanitized); // Devuelve el RUT formateado
};
