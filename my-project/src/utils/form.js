{/* Formulario para añadir una nueva ficha */}
const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaFicha((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    const savedFicha = await saveFichaClinica(nuevaFicha);
    if (savedFicha) {
      alert('Ficha clínica guardada correctamente');
      setFichas([...fichas, savedFicha]);
      setShowForm(false);
      setNuevaFicha({
        id_paciente: rut,
        factores: '',
        anamnesis: '',
        motivo_consulta: '',
        rau_necesidades: '',
        examen_fisico: '',
        instrumentos_aplicados: '',
        diagnostico: '',
        intervenciones: ''
      });
    } else {
      alert('Error al guardar la ficha clínica');
    }
  };

  const handleDiscard = () => {
    setNuevaFicha({
      id_paciente: rut,
      factores: '',
      anamnesis: '',
      motivo_consulta: '',
      rau_necesidades: '',
      examen_fisico: '',
      instrumentos_aplicados: '',
      diagnostico: '',
      intervenciones: ''
    });
    setShowForm(false);
  };



{showForm && (
    <form className="space-y-6">
      <h2 className="text-xl font-semibold">Nueva Atención</h2>
      {/* Campos del formulario */}
      <div className="grid grid-cols-2 gap-4">
        <textarea name="factores" value={nuevaFicha.factores} onChange={handleChange} placeholder="Factores" className="border rounded-md p-2"></textarea>
        <textarea name="anamnesis" value={nuevaFicha.anamnesis} onChange={handleChange} placeholder="Anamnesis" className="border rounded-md p-2"></textarea>
        <textarea name="motivo_consulta" value={nuevaFicha.motivo_consulta} onChange={handleChange} placeholder="Motivo Consulta" className="border rounded-md p-2"></textarea>
        <textarea name="rau_necesidades" value={nuevaFicha.rau_necesidades} onChange={handleChange} placeholder="Rau Necesidades" className="border rounded-md p-2"></textarea>
        <textarea name="examen_fisico" value={nuevaFicha.examen_fisico} onChange={handleChange} placeholder="Examen Físico" className="border rounded-md p-2"></textarea>
        <textarea name="instrumentos_aplicados" value={nuevaFicha.instrumentos_aplicados} onChange={handleChange} placeholder="Instrumentos Aplicados" className="border rounded-md p-2"></textarea>
      </div>
      <textarea name="diagnostico" value={nuevaFicha.diagnostico} onChange={handleChange} placeholder="Diagnóstico" className="border rounded-md p-2 w-full"></textarea>
      <textarea name="intervenciones" value={nuevaFicha.intervenciones} onChange={handleChange} placeholder="Intervenciones" className="border rounded-md p-2 w-full"></textarea>
      <div className="flex space-x-4 mt-4">
        <button type="button" onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md">Confirmar</button>
        <button type="button" onClick={handleDiscard} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md">Descartar</button>
      </div>
    </form>
  )}