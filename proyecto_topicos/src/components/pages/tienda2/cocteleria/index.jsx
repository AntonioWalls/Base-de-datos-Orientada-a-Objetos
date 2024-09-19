import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Element } from 'react-scroll';

import TablaCocteleria from './buscar/index';
import ModificarCocteleria from './modificar';
import GuardarCocteleria from './guardar';

const Coctelerias = () => {
  const navigate = useNavigate();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [esEditar, setEsEditar] = useState(false);
  const [idCocteleria, setIdCocteleria] = useState(null);

  useEffect(() => {
    localStorage.setItem('activeMenu', 'Cocteles');
  }, []);

  const mostrarTabla = () => {
    navigate('/cocteleriaB');
    setEsEditar(false);
    setMostrarFormulario(false);
    setIdCocteleria(null); // Resetear ID
  };

  const handleFormulario = (esEditar = false, idCocteleria = null) => {
    setEsEditar(esEditar);
    setMostrarFormulario(true);
    setIdCocteleria(idCocteleria);
    navigate('/cocteleriaB/guardar'); // Usar la misma ruta para ambos formularios
  };

  return (
    <Element>
      {mostrarFormulario ? 
        (esEditar ? 
          <ModificarCocteleria onCancel={mostrarTabla} idCocteleria={idCocteleria} /> 
        : 
          <GuardarCocteleria onCancel={mostrarTabla} /> 
        ) : (
        <TablaCocteleria mostrarFormulario={handleFormulario} />
      )}
    </Element> 
  );
};

export default Coctelerias;