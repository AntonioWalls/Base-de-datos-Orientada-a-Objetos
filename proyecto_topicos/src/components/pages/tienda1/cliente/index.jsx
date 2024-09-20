import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Element } from 'react-scroll';

import TablaClientes from './buscar/index';
import ModificarCliente from './modificar';
import GuardarCliente from './guardar';

const Clientes = () => {
  const navigate = useNavigate();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [esEditar, setEsEditar] = useState(false);
  const [idCliente, setIdCliente] = useState(null);

  useEffect(() => {
    localStorage.setItem('activeMenu', 'Clientes');
  }, []);

  const mostrarTabla = () => {
    navigate('/clientesA');
    setEsEditar(false);
    setMostrarFormulario(false);
    setIdCliente(null); // Resetear ID
  };

  const handleFormulario = (esEditar = false, idCliente = null) => {
    setEsEditar(esEditar);
    setMostrarFormulario(true);
    setIdCliente(idCliente);
    navigate('/clientesA/guardar'); // Usar la misma ruta para ambos formularios
  };

  return (
    <Element>
      {mostrarFormulario ? 
        (esEditar ? 
          <ModificarCliente onCancel={mostrarTabla} idCliente={idCliente} /> 
        : 
          <GuardarCliente onCancel={mostrarTabla} /> 
        ) : (
        <TablaClientes mostrarFormulario={handleFormulario} />
      )}
    </Element> 
  );
};

export default Clientes;