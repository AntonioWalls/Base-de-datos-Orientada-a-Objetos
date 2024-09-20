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
  const [idCoct, setIdCocteleria] = useState(null);

  useEffect(() => {
    localStorage.setItem('activeMenu', 'Cocteles');
  }, []);

  const mostrarTabla = () => {
    navigate('/cocteleriaA');
    setEsEditar(false);
    setMostrarFormulario(false);
    setIdCocteleria(null); // Resetear ID
  };

  const handleFormulario = (esEditar = false, idCoct = null) => {
    setEsEditar(esEditar);
    setMostrarFormulario(true);
    setIdCocteleria(idCoct);
    navigate('/cocteleriaA/guardar'); // Usar la misma ruta para ambos formularios
  };

  return (
    <Element>
      {mostrarFormulario ? 
        (esEditar ? 
          <ModificarCocteleria onCancel={mostrarTabla} idCoct={idCoct} /> 
        : 
          <GuardarCocteleria onCancel={mostrarTabla} /> 
        ) : (
        <TablaCocteleria mostrarFormulario={handleFormulario} />
      )}
    </Element> 
  );
};

export default Coctelerias;