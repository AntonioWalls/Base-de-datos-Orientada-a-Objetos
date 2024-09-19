import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { loadMessages } from '@progress/kendo-react-intl';
import mensajesKendo from '../kendo/es.json';

// Componentes
import App from '../../layout/App/App';
import Inicio from '../../pages/inicio/Inicio';
import Sucursal from '../../pages/sucursal';
import Sucursal2 from '../../pages/tienda2/sucursal';
import VentaB from '../../pages/tienda2/venta'
import ClienteB from '../../pages/tienda2/cliente'
import EmpleadoB from '../../pages/tienda2/empleado'
import ProveedorB from '../../pages/tienda2/proveedor'
import CocteleriaB from '../../pages/tienda2/cocteleria'

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
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default Root;