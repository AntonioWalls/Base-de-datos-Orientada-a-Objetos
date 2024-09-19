import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Element } from 'react-scroll';

import TablaEmpleados from './buscar/index';
import ModificarEmpleado from './modificar';
import GuardarEmpleado from './guardar';

const Empleados = () => {
  const navigate = useNavigate();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [esEditar, setEsEditar] = useState(false);
  const [idEmpleado, setIdEmpleado] = useState(null);

  useEffect(() => {
    localStorage.setItem('activeMenu', 'Empleados');
  }, []);

  const mostrarTabla = () => {
    navigate('/empleadoB');
    setEsEditar(false);
    setMostrarFormulario(false);
    setIdEmpleado(null); // Resetear ID
  };

  const handleFormulario = (esEditar = false, idEmpleado = null) => {
    setEsEditar(esEditar);
    setMostrarFormulario(true);
    setIdEmpleado(idEmpleado);
    navigate('/empleadoB/guardar'); // Usar la misma ruta para ambos formularios
  };

  return (
    <Element>
      {mostrarFormulario ? 
        (esEditar ? 
          <ModificarEmpleado onCancel={mostrarTabla} idEmpleado={idEmpleado} /> 
        : 
          <GuardarEmpleado onCancel={mostrarTabla} /> 
        ) : (
        <TablaEmpleados mostrarFormulario={handleFormulario} />
      )}
    </Element> 
  );
};

export default Empleados;