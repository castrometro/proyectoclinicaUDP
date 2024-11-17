import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2 } from 'lucide-react';
import { getUsers, deleteUser, updateUser } from '../utils/userService'; // Asegúrate de tener un servicio de usuarios

export default function GestionUsuarios() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editingData, setEditingData] = useState({ name: '', email: '', role: '' });

  // Obtener usuarios del backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  // Actualizar la lista filtrada de usuarios cuando cambia el término de búsqueda
  useEffect(() => {
    if (searchTerm) {
      setFilteredUsers(
        users.filter((user) =>
          `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  // Manejar el cambio en el formulario de edición
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Guardar los cambios del usuario editado
  const handleSave = async () => {
    try {
      await updateUser(editingUser.id, editingData);
      alert('Usuario actualizado correctamente');
      setEditingUser(null); // Cerrar el formulario de edición
      // Actualizar la lista de usuarios
      const updatedUsers = users.map((user) =>
        user.id === editingUser.id ? { ...user, ...editingData } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      alert('Hubo un error al actualizar el usuario');
    }
  };

  // Eliminar usuario
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        await deleteUser(id);
        alert('Usuario eliminado correctamente');
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        alert('Hubo un error al eliminar el usuario');
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Gestión de Usuarios</h2>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar usuarios..."
            className="w-full px-4 py-2 border rounded-md pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Rol
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="text-blue-600 hover:text-blue-800 mr-2"
                  onClick={() => {
                    setEditingUser(user);
                    setEditingData({ name: user.name, email: user.email, role: user.role });
                  }}
                >
                  <Edit size={18} />
                </button>
                <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(user.id)}>
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal o formulario de edición */}
      {editingUser && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md shadow">
          <h3 className="text-lg font-semibold mb-4">Editar Usuario</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Nombre</label>
              <input
                type="text"
                name="name"
                value={editingData.name}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={editingData.email}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Rol</label>
              <select
                name="role"
                value={editingData.role}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="Administrador">Administrador</option>
                <option value="Docente">Docente</option>
                <option value="Estudiante">Estudiante</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2" onClick={handleSave}>
              Guardar Cambios
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              onClick={() => setEditingUser(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
