import Inicio from "../components/pages/inicio/Inicio";
import Sucursal from "../components/pages/sucursal";
import Sucursal2 from "../components/pages/tienda2/sucursal";
import VentaB from "../components/pages/tienda2/venta"
import ClienteB from '../../pages/tienda2/cliente'
import EmpleadoB from '../../pages/tienda2/empleado'
import ProveedorB from '../../pages/tienda2/proveedor'

const Routes = [
    {
        path: '/',
        component: Inicio,
    },
    {
        path: '/sucursal',
        component: Sucursal
    },
    {
        path: '/sucursal/guardar',
        component: Sucursal
    },
    {
        path: '/sucursalB',
        component: Sucursal2
    },
    {
        path: '/sucursalB/guardar',
        component: Sucursal2
    },
    {
        path: '/ventasB',
        component: VentaB
    },
    {
        path: '/ventasB/guardar',
        component: VentaB
    },
    {
        path: '/clienteB',
        component: ClienteB
    },
    {
        path: '/clienteB/guardar',
        component: ClienteB
    },
    {
        path: '/empleadoB',
        component: EmpleadoB
    },
    {
        path: '/empleadoB/guardar',
        component: EmpleadoB
    },
    {
        path: '/proveedorB',
        component: ProveedorB
    },
    {
        path: '/ventasB/guardar',
        component: ProveedorB
    },
];
export default Routes;