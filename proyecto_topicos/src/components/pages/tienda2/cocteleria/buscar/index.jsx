import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { EstructuraCoctelerias } from "../../../../../constants/EstructuraTabla"; 
import TablaKendo from "../../../../common/root/componentes/TablaKendo";
import { listarCocteleria, eliminarCocteleria } from '../../../../../redux/actions/actionCocteleriaB'; 
import Swal from 'sweetalert2';

const ordenamientoInicial = [
  {
    field: "nombre",
    dir: "asc",
  }
];

const TablaCocteleria = ({ mostrarFormulario }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Obtener cocteles del store de Redux
  const cocteles = useSelector((state) => state.getCocteleriaB.cocteles?.response || []);
  
  const [dataState, setDataState] = useState([]);

  // Dispatch de la acción para listar los cocteles al cargar el componente
  useEffect(() => {
    dispatch(listarCocteleria());
  }, [dispatch]);

  // Mapeo de datos con id genérico
  const mappedData = React.useMemo(() => {
    return cocteles.map((item) => ({
      ...item,
      id: item.idSucursal || item.idProv || item.idCoct,
    }));
  }, [cocteles]);
  
  useEffect(() => {
    setDataState(mappedData);
  }, [mappedData]);

  // Función para eliminar un coctel
  const handleEliminar = (id_coct) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(eliminarCocteleria(id_coct)).then((response) => {
          if (!response.error) {
            Swal.fire({
              title: "Eliminado",
              text: "El coctel ha sido eliminado.",
              icon: "success"
            });
            dispatch(listarCocteleria()); // Recargar los cocteles después de eliminar
          } else {
            Swal.fire({
              title: "Error",
              text: "No se pudo eliminar el coctel.",
              icon: "error"
            });
          }
        });
      }
    });
  };

  // Función para editar un coctel
  const handleEditar = (idCoct) => {
    mostrarFormulario(true, idCoct);
  };

  // Función para crear un nuevo coctel
  const handleNuevo = () => {
    mostrarFormulario(false);
  };

  return (
    dataState && (
      <TablaKendo
        estructuraTabla={EstructuraCoctelerias} 
        funcionEditar={handleEditar}
        funcionNuevo={handleNuevo}
        funcionEliminar={handleEliminar}
        data={dataState}
        ordenamientoInicial={ordenamientoInicial}
      />
    )
  );
};

export default TablaCocteleria;

