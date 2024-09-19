import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Element } from 'react-scroll';

import TablaProductos from './buscar/index';
import ModificarProducto from './modificar';
import GuardarProducto from './guardar';

const Productos = () => {
  const navigate = useNavigate();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [esEditar, setEsEditar] = useState(false);
  const [idProducto, setIdProducto] = useState(null);

  useEffect(() => {
    localStorage.setItem('activeMenu', 'Productos');
  }, []);

  const mostrarTabla = () => {
    navigate('/productoB');
    setEsEditar(false);
    setMostrarFormulario(false);
    setIdProducto(null); // Resetear ID
  };

  const handleFormulario = (esEditar = false, idProducto = null) => {
    setEsEditar(esEditar);
    setMostrarFormulario(true);
    setIdProducto(idProducto);
    navigate('/productoB/guardar'); // Usar la misma ruta para ambos formularios
  };

  return (
    <Element>
      {mostrarFormulario ? 
        (esEditar ? 
          <ModificarProducto onCancel={mostrarTabla} idProducto={idProducto} /> 
        : 
          <GuardarProducto onCancel={mostrarTabla} /> 
        ) : (
        <TablaProductos mostrarFormulario={handleFormulario} />
      )}
    </Element> 
  );
};

export default Productos;