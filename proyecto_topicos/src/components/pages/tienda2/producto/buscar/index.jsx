import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { EstructuraProductos } from "../../../../../constants/EstructuraTabla";
import TablaKendo from "../../../../common/root/componentes/TablaKendo";
import { listarProducto, eliminarProducto } from '../../../../../redux/actions/actionProductoB';
import Swal from 'sweetalert2';

const ordenamientoInicial = [
  {
    field: "nombre",
    dir: "asc",
  }
];

const TablaProductos = ({ mostrarFormulario }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.getProductoB.productos?.response || []);
  const [dataState, setDataState] = useState([]);

  useEffect(() => {
    dispatch(listarProducto());
  }, [dispatch]);

  // Mapeo de datos con id genérico
  const mappedData = React.useMemo(() => {
    return productos.map((item) => ({
      ...item,
      id: item.idSucursal || item.idProv || item.idProd,
    }));
  }, [productos]);
  
  useEffect(() => {
    setDataState(mappedData);
  }, [mappedData]);
  
  

  // Función para eliminar la sucursal seleccionada
  const handleEliminar = (idProducto) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(eliminarProducto(idProducto)).then((response) => {
          if (!response.error) {
            Swal.fire({
              title: "Eliminado",
              text: "El producto ha sido eliminada.",
              icon: "success"
            });
            dispatch(listarProducto()); 
          } else {
            Swal.fire({
              title: "Error",
              text: "No se pudo eliminar el producto.",
              icon: "error"
            });
          }
        });
      }
    });
  };

  const handleEditar = (idProducto) => {
    mostrarFormulario(true, idProducto);
  };

  const handleNuevo = () => {
    mostrarFormulario(false);
  };

  return (
    dataState && (
      <TablaKendo
        estructuraTabla={EstructuraProductos}
        funcionEditar={handleEditar}
        funcionNuevo={handleNuevo}
        funcionEliminar={handleEliminar}
        data={dataState}
        ordenamientoInicial={ordenamientoInicial}
      />
    )
  );
};

export default TablaProductos;
