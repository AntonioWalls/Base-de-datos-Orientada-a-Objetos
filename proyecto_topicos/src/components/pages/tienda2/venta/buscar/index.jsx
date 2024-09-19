import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { EstructuraVentas } from "../../../../../constants/EstructuraTabla";
import TablaKendo from "../../../../common/root/componentes/TablaKendo";
import { listarVenta, eliminarVenta } from '../../../../../redux/actions/actionVentaB';
import Swal from 'sweetalert2';

const ordenamientoInicial = [
  {
    field: "nombre",
    dir: "asc",
  }
];

const TablaVentas = ({ mostrarFormulario }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ventas = useSelector((state) => state.getVentaB.ventas?.response || []);
  const [dataState, setDataState] = useState([]);

  useEffect(() => {
    dispatch(listarVenta());
  }, [dispatch]);

  useEffect(() => {
    setDataState(ventas);
  }, [ventas]);

  // Función para eliminar la sucursal seleccionada
  const handleEliminar = (idVenta) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(eliminarVenta(idVenta)).then((response) => {
          if (!response.error) {
            Swal.fire({
              title: "Eliminado",
              text: "La venta ha sido eliminada.",
              icon: "success"
            });
            dispatch(listarVenta()); // Recargar las sucursales después de eliminar
          } else {
            Swal.fire({
              title: "Error",
              text: "No se pudo eliminar la venta.",
              icon: "error"
            });
          }
        });
      }
    });
  };

  const handleEditar = (idVenta) => {
    mostrarFormulario(true, idVenta);
  };

  const handleNuevo = () => {
    mostrarFormulario(false);
  };

  return (
    dataState && (
      <TablaKendo
        estructuraTabla={EstructuraVentas}
        funcionEditar={handleEditar}
        funcionNuevo={handleNuevo}
        funcionEliminar={handleEliminar}
        data={dataState}
        ordenamientoInicial={ordenamientoInicial}
      />
    )
  );
};

export default TablaVentas;