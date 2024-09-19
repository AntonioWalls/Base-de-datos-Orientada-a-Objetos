import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Element } from 'react-scroll';

import TablaVentas from './buscar/index';
import ModificarVentas from './modificar';
import GuardarVenta from './guardar';

const Ventas = () => {
  const navigate = useNavigate();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [esEditar, setEsEditar] = useState(false);
  const [idVenta, setIdVenta] = useState(null);

  useEffect(() => {
    localStorage.setItem('activeMenu', 'Ventas');
  }, []);

  const mostrarTabla = () => {
    navigate('/ventasB');
    setEsEditar(false);
    setMostrarFormulario(false);
    setIdVenta(null); // Resetear ID
  };

  const handleFormulario = (esEditar = false, idVenta = null) => {
    setEsEditar(esEditar);
    setMostrarFormulario(true);
    setIdVenta(idVenta);
    navigate('/ventasB/guardar'); // Usar la misma ruta para ambos formularios
  };

  return (
    <Element>
      {mostrarFormulario ? 
        (esEditar ? 
          <ModificarVentas onCancel={mostrarTabla} idVenta={idVenta} /> 
        : 
          <GuardarVenta onCancel={mostrarTabla} /> 
        ) : (
        <TablaVentas mostrarFormulario={handleFormulario} />
      )}
    </Element> 
  );
};

export default Ventas;