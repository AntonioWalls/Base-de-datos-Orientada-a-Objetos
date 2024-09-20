import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { listarCliente, eliminarCliente } from '../../../../redux/actions/actionClienteB';
import { EstructuraClientes } from "../../../../constants/EstructuraTabla";
import TablaKendo from "../../../common/root/componentes/TablaKendo";
import FiltroCliente from './filtro';  // Importa el filtro

const ordenamientoInicial = [
  {
    field: "nombre",
    dir: "asc",
  }
];

const TablaClientes = ({ mostrarFormulario }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clientes = useSelector((state) => state.getClienteB.clientes?.response || []);
  const [dataState, setDataState] = useState([]);
  const [filtros, setFiltro] = useState({ Habilitado: true });  // Estado para filtros

  // Efecto para listar los clientes basados en los filtros
  useEffect(() => {
    dispatch(listarCliente(filtros));
  }, [dispatch, filtros]);

  // Mapeo de datos con id genérico
  useEffect(() => {
    console.log("Datos recibidos de la API:", clientes);
    const mappedData = clientes.map((item) => ({
      ...item,
      id: item.idCliente,  // Verifica que este ID sea correcto
    }));
    setDataState(mappedData);
  }, [clientes]);

  // Función para eliminar un cliente
  const handleEliminar = (idCliente) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(eliminarCliente(idCliente)).then((response) => {
          if (!response.error) {
            Swal.fire({
              title: "Eliminado",
              text: "El cliente ha sido eliminado.",
              icon: "success"
            });
            dispatch(listarCliente(filtros));  // Recargar los clientes después de eliminar
          } else {
            Swal.fire({
              title: "Error",
              text: "No se pudo eliminar el cliente.",
              icon: "error"
            });
          }
        });
      }
    });
  };

  const handleEditar = (idCliente) => {
    mostrarFormulario(true, idCliente);
  };

  const handleNuevo = () => {
    mostrarFormulario(false);
  };

  // Renderizado del componente
  return (
    dataState && (
      <>
        {/* Componente para filtrar los clientes */}
        <FiltroCliente
          onFilter={(newValues) => setFiltro(newValues)}  // Actualiza los filtros con base en el filtro aplicado
        />
        {/* Componente de la tabla Kendo */}
        <TablaKendo
          estructuraTabla={EstructuraClientes}
          funcionEditar={handleEditar}
          funcionNuevo={handleNuevo}
          funcionEliminar={handleEliminar}
          data={dataState}
          ordenamientoInicial={ordenamientoInicial}
        />
      </>
    )
  );
};

export default TablaClientes;
