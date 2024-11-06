const Paciente = require('../database/models/paciente');

class PacienteService {
  static async getAllPacientes() {
    try {
      return await Paciente.findAll();
    } catch (error) {
      throw new Error('Error al obtener los pacientes: ' + error.message);
    }
  }

  static async getPacienteById(id) {
    try {
      const paciente = await Paciente.findById(id);
      if (!paciente) {
        throw new Error('Paciente no encontrado');
      }
      return paciente;
    } catch (error) {
      throw new Error('Error al obtener el paciente: ' + error.message);
    }
  }

  static async createPaciente(pacienteData) {
    try {
      return await Paciente.create(pacienteData);
    } catch (error) {
      throw new Error('Error al crear el paciente: ' + error.message);
    }
  }

  static async updatePaciente(id, pacienteData) {
    try {
      return await Paciente.update(id, pacienteData);
    } catch (error) {
      throw new Error('Error al actualizar el paciente: ' + error.message);
    }
  }

  static async deletePaciente(id) {
    try {
      return await Paciente.delete(id);
    } catch (error) {
      throw new Error('Error al eliminar el paciente: ' + error.message);
    }
  }
}

module.exports = PacienteService;