import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Element } from 'react-scroll';

import TablaSucursales from './buscar/index';
import ModificarSucursal from './modificar';
import GuardarSucursal from './guardar';

const Sucursales = () => {
  const navigate = useNavigate();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [esEditar, setEsEditar] = useState(false);
  const [idSucursal, setIdSucursal] = useState(null);

  useEffect(() => {
    localStorage.setItem('activeMenu', 'Sucursales');
  }, []);

  const mostrarTabla = () => {
    navigate('/sucursalB');
    setEsEditar(false);
    setMostrarFormulario(false);
    setIdSucursal(null); // Resetear ID
  };

  const handleFormulario = (esEditar = false, idSucursal = null) => {
    setEsEditar(esEditar);
    setMostrarFormulario(true);
    setIdSucursal(idSucursal);
    navigate('/sucursalB/guardar'); // Usar la misma ruta para ambos formularios
  };

  return (
    <Element>
      {mostrarFormulario ? 
        (esEditar ? 
          <ModificarSucursal onCancel={mostrarTabla} idSucursal={idSucursal} /> 
        : 
          <GuardarSucursal onCancel={mostrarTabla} /> 
        ) : (
        <TablaSucursales mostrarFormulario={handleFormulario} />
      )}
    </Element> 
  );
};

export default Sucursales;