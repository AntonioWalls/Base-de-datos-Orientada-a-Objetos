import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { loadMessages } from '@progress/kendo-react-intl';
import mensajesKendo from '../kendo/es.json';

// Componentes
import App from '../../layout/App/App';
import Inicio from '../../pages/inicio/Inicio';
import Sucursal from '../../pages/sucursal';
import VentaA from '../../pages/tienda1/venta'
import ClienteA from '../../pages/tienda1/cliente'
import EmpleadoA from '../../pages/tienda1/empleado'
import ProveedorA from '../../pages/tienda1/proveedor'
import CocteleriaA from '../../pages/tienda1/cocteleria'
import ProductoA from '../../pages/tienda1/producto'

import Sucursal2 from '../../pages/tienda2/sucursal';
import VentaB from '../../pages/tienda2/venta'
import ClienteB from '../../pages/tienda2/cliente'
import EmpleadoB from '../../pages/tienda2/empleado'
import ProveedorB from '../../pages/tienda2/proveedor'
import CocteleriaB from '../../pages/tienda2/cocteleria'
import ProductoB from '../../pages/tienda2/producto'

const Root = () => {
  loadMessages(mensajesKendo, 'es');

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Inicio />} />
            <Route path="sucursal" element={<Sucursal />} />
            <Route path="sucursal/guardar" element={<Sucursal />} />
            <Route path="sucursalB" element={<Sucursal2 />} />
            <Route path="sucursalB/guardar" element={<Sucursal2 />} />
            <Route path="ventasB" element={<VentaB />} />
            <Route path="ventasB/guardar" element={<VentaB />} />
            <Route path="clienteB" element={<ClienteB />} />
            <Route path="clienteB/guardar" element={<ClienteB />} />
            <Route path="empleadoB" element={<EmpleadoB />} />
            <Route path="empleadoB/guardar" element={<EmpleadoB />} />
            <Route path="proveedorB" element={<ProveedorB />} />
            <Route path="proveedorB/guardar" element={<ProveedorB />} />
            <Route path="cocteleriaB" element={<CocteleriaB />} />
            <Route path="cocteleriaB/guardar" element={<CocteleriaB />} />
            <Route path="productoB" element={<ProductoB />} />
            <Route path="productoB/guardar" element={<ProductoB />} />
            <Route path="ventasA" element={<VentaA />} />
            <Route path="ventasA/guardar" element={<VentaA />} />
            <Route path="clientesA" element={<ClienteA />} />
            <Route path="clientesA/guardar" element={<ClienteA />} />
            <Route path="empleadosA" element={<EmpleadoA />} />
            <Route path="empleadosA/guardar" element={<EmpleadoA />} />
            <Route path="proveedorA" element={<ProveedorA />} />
            <Route path="proveedorA/guardar" element={<ProveedorA />} />
            <Route path="cocteleriaA" element={<CocteleriaA />} />
            <Route path="cocteleriaA/guardar" element={<CocteleriaA />} />
            <Route path="productoA" element={<ProductoA />} />
            <Route path="productoA/guardar" element={<ProductoA />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default Root;