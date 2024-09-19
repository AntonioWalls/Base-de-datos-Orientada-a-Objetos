import { configureStore } from "@reduxjs/toolkit";
import { getClienteAReducer } from "../slice/sliceClienteA";
import { getClienteBReducer } from "../slice/sliceClienteB";
import { getCocteleriaAReducer } from "../slice/sliceCocteleriaA";
import { getCocteleriaBReducer } from "../slice/sliceCocteleriaB";
import { getEmpleadoAReducer } from "../slice/sliceEmpleadoA";
import { getEmpleadoBReducer } from "../slice/sliceEmpleadoB";
import { getInventarioAReducer } from "../slice/sliceInventarioA";
import { getInventarioBReducer } from "../slice/sliceInventarioB";
import { getProductoAReducer } from "../slice/sliceProductoA";
import { getProductoBReducer } from "../slice/sliceProductoB";
import { getProveedorAReducer } from "../slice/sliceProveedorA";
import { getProveedorBReducer } from "../slice/sliceProveedorB";
import { getSucursalAReducer } from "../slice/sliceSucursalA";
import { getSucursalBReducer } from "../slice/sliceSucursalB";
import { getVentaAReducer } from "../slice/sliceVentaA";
import { getVentaBReducer } from "../slice/sliceVentaB";

export default configureStore({
  reducer: {
    getClienteA: getClienteAReducer,
    getClienteB: getClienteBReducer,
    getCocteleriaA: getCocteleriaAReducer,
    getCocteleriaB: getCocteleriaBReducer,
    getEmpleadoA: getEmpleadoAReducer,
    getEmpleadoB: getEmpleadoBReducer,
    getInventarioA: getInventarioAReducer,
    getInventarioB: getInventarioBReducer,
    getProductoA: getProductoAReducer,
    getProductoB: getProductoBReducer,
    getProveedorA: getProveedorAReducer,
    getProveedorB: getProveedorBReducer,
    getSucursalA: getSucursalAReducer,
    getSucursalB: getSucursalBReducer,
    getVentaA: getVentaAReducer,
    getVentaB: getVentaBReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});