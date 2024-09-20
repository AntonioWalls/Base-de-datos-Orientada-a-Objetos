import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Element } from 'react-scroll';

import TablaProveedores from './buscar/index';
import ModificarProveedor from './modificar';
import GuardarProveedor from './guardar';
import { Tab } from 'react-bootstrap';

const Proveedores = () => {
  const navigate = useNavigate();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [esEditar, setEsEditar] = useState(false);
  const [idProveedor, setIdProveedor] = useState(null);

  useEffect(() => {
    localStorage.setItem('activeMenu', 'Proveedores');
  }, []);

  const mostrarTabla = () => {
    navigate('/proveedorA');
    setEsEditar(false);
    setMostrarFormulario(false);
    setIdProveedor(null); // Resetear ID
  };

  const handleFormulario = (esEditar = false, idProveedor = null) => {
    setEsEditar(esEditar);
    setMostrarFormulario(true);
    setIdProveedor(idProveedor);
    navigate('/proveedorA/guardar'); // Usar la misma ruta para ambos formularios
  };

  return (
    <Element>
      {mostrarFormulario ? 
        (esEditar ? 
          <ModificarProveedor onCancel={mostrarTabla} idProveedor={idProveedor} /> 
        : 
          <GuardarProveedor onCancel={mostrarTabla} /> 
        ) : (
        <TablaProveedores mostrarFormulario={handleFormulario} />
      )}
    </Element> 
  );
};

export default Proveedores;