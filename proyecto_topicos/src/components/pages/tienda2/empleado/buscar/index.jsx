import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { EstructuraEmpleados } from "../../../../../constants/EstructuraTabla";
import TablaKendo from "../../../../common/root/componentes/TablaKendo";
import { listarEmpleado, eliminarEmpleado } from '../../../../../redux/actions/actionEmpleadoB';
import Swal from 'sweetalert2';
import FiltroEmpleado from './filtro';  // Importa el filtro

const ordenamientoInicial = [
  {
    field: "nombre",
    dir: "asc",
  }
];

const TablaEmpleados = ({ mostrarFormulario }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const empleados = useSelector((state) => state.getEmpleadoB.empleados?.response || []);
  const [dataState, setDataState] = useState([]);
  const [filtros, setFiltro] = useState({ Habilitado: true });  // Estado para filtros
  

  useEffect(() => {
    dispatch(listarEmpleado());
  }, [dispatch, filtros]);

  // Mapeo de datos con id genérico
  const mappedData = React.useMemo(() => {
    return empleados.map((item) => ({
      ...item,
      id: item.idEmpleado,
    }));
  }, [empleados]);
  
  useEffect(() => {
    setDataState(mappedData);
  }, [mappedData]);
  
  

  // Función para eliminar la sucursal seleccionada
  const handleEliminar = (idEmpleado) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(eliminarEmpleado(idEmpleado)).then((response) => {
          if (!response.error) {
            Swal.fire({
              title: "Eliminado",
              text: "El empleado ha sido eliminada.",
              icon: "success"
            });
            dispatch(listarEmpleado()); 
          } else {
            Swal.fire({
              title: "Error",
              text: "No se pudo eliminar el empleado.",
              icon: "error"
            });
          }
        });
      }
    });
  };

  const handleEditar = (idEmpleado) => {
    mostrarFormulario(true, idEmpleado);
  };

  const handleNuevo = () => {
    mostrarFormulario(false);
  };

  return (
    dataState && (
      <>
        {/* Componente para filtrar los clientes */}
        <FiltroEmpleado
          onFilter={(newValues) => setFiltro(newValues)}  // Actualiza los filtros con base en el filtro aplicado
        />
        {/* Componente de la tabla Kendo */}
        <TablaKendo
          estructuraTabla={EstructuraEmpleados}
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

export default TablaEmpleados;
