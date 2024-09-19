import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { EstructuraProveedores } from "../../../../../constants/EstructuraTabla";
import TablaKendo from "../../../../common/root/componentes/TablaKendo";
import { listarProveedor, eliminarProveedor } from '../../../../../redux/actions/actionProveedorB';
import Swal from 'sweetalert2';

const ordenamientoInicial = [
  {
    field: "nombre",
    dir: "asc",
  }
];

const TablaProveedor = ({ mostrarFormulario }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const proveedores = useSelector((state) => state.getProveedorB.proveedores?.response || []);
  const [dataState, setDataState] = useState([]);

  useEffect(() => {
    dispatch(listarProveedor());
  }, [dispatch]);

  useEffect(() => {
    console.log("Datos recibidos de la API:", proveedores);
    const mappedData = proveedores.map((item) => ({
      ...item,
      id: item.idProv || item.idSucursal || item.idOtraEntidad, // Asegúrate de que uno de estos campos exista
    }));
    setDataState(mappedData);
  }, [proveedores]);
  

  // Función para eliminar el proveedor seleccionado
  const handleEliminar = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(eliminarProveedor(id)).then((response) => {
          if (!response.error) {
            Swal.fire({
              title: "Eliminado",
              text: "El proveedor ha sido eliminado.",
              icon: "success"
            });
            dispatch(listarProveedor()); // Recargar los proveedores después de eliminar
          } else {
            Swal.fire({
              title: "Error",
              text: "No se pudo eliminar el proveedor.",
              icon: "error"
            });
          }
        });
      }
    });
  };

  const handleEditar = (id) => {
    mostrarFormulario(true, id); // Usamos el campo genérico id
  };

  const handleNuevo = () => {
    mostrarFormulario(false);
  };

  return (
    dataState && (
      <TablaKendo
        estructuraTabla={EstructuraProveedores}
        funcionEditar={handleEditar}
        funcionNuevo={handleNuevo}
        funcionEliminar={handleEliminar}
        data={dataState}
        ordenamientoInicial={ordenamientoInicial}
      />
    )
  );
};

export default TablaProveedor;