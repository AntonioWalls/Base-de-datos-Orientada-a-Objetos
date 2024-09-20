export const EstructuraMenu = {
  "Navegacion": {
    "etiqueta": "Navegación",
    "items": [
      {
        "etiqueta": "Inicio",
        "Path": "/",
        "icon": "mdi-home",
        "Hijos": []
      }
    ]
  },

  "Sucursales": {
    "etiqueta": "Sucursales",
    "items": [
      {
        "etiqueta": "Sucursal HMO",
        "Path": "",
        "icon": "mdi mdi-storefront",
        "Hijos": [
          {
            "etiqueta": "Sucursal",
            "Path": "/sucursal",
            "icon": "mdi mdi-storefront",
            "Hijos": []
          },
          {
            "etiqueta": "Clientes",
            "Path": "/clientesA",
            "icon": "mdi-account",
            "Hijos": []
          },
          {
            "etiqueta": "Empleados",
            "Path": "/empleadosA",
            "icon": "mdi-account-group",
            "Hijos": []
          },
          {
            "etiqueta": "Ventas",
            "Path": "/ventasA",
            "icon": "mdi-cart",
            "Hijos": []
          },
          {
            "etiqueta": "Cocteleria",
            "Path": "/cocteleriaA",
            "icon": "mdi-glass-cocktail",
            "Hijos": []
          },
          {
            "etiqueta": "Producto",
            "Path": "/productoA",
            "icon": "mdi-package-variant",
            "Hijos": []
          },
          {
            "etiqueta": "Proveedor",
            "Path": "/proveedorA",
            "icon": "mdi-truck",
            "Hijos": []
          }
        ]
      },
      // Aquí se añade la nueva Sucursal 2 con los mismos Hijos
      {
        "etiqueta": "Sucursal GYS",
        "Path": "",
        "icon": "mdi mdi-storefront",
        "Hijos": [
          {
            "etiqueta": "Sucursal",
            "Path": "/sucursalB",
            "icon": "mdi mdi-storefront",
            "Hijos": []
          },
          {
            "etiqueta": "Clientes",
            "Path": "/clienteB",
            "icon": "mdi-account",
            "Hijos": []
          },
          {
            "etiqueta": "Empleados",
            "Path": "/empleadoB",
            "icon": "mdi-account-group",
            "Hijos": []
          },
          {
            "etiqueta": "Ventas",
            "Path": "/ventasB",
            "icon": "mdi-cart",
            "Hijos": []
          },
          {
            "etiqueta": "Cocteleria",
            "Path": "/cocteleriaB",
            "icon": "mdi-glass-cocktail",
            "Hijos": []
          },
          {
            "etiqueta": "Producto",
            "Path": "/productoB",
            "icon": "mdi-package-variant",
            "Hijos": []
          },
          {
            "etiqueta": "Proveedor",
            "Path": "/proveedorB",
            "icon": "mdi-truck",
            "Hijos": []
          }
        ]
      }
    ]
  }

  // Añade otras categorías y elementos adicionales según sea necesario
};
