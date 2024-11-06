const db = require('../index');

class Paciente {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM pacientes');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM pacientes WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(paciente) {
    const { nombre, apellido, fecha_nacimiento, rut, email, telefono } = paciente;
    const [result] = await db.query(
      'INSERT INTO pacientes (nombre, apellido, fecha_nacimiento, rut, email, telefono) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, apellido, fecha_nacimiento, rut, email, telefono]
    );
    return { id: result.insertId, ...paciente };
  }

  static async update(id, paciente) {
    const { nombre, apellido, fecha_nacimiento, rut, email, telefono } = paciente;
    await db.query(
      'UPDATE pacientes SET nombre = ?, apellido = ?, fecha_nacimiento = ?, rut = ?, email = ?, telefono = ? WHERE id = ?',
      [nombre, apellido, fecha_nacimiento, rut, email, telefono, id]
    );
    return { id, ...paciente };
  }

  static async delete(id) {
    await db.query('DELETE FROM pacientes WHERE id = ?', [id]);
    return true;
  }
}

module.exports = Paciente;