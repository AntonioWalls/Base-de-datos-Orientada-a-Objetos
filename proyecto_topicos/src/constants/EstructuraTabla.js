
export const EstructuraSucursales = {
    columns: [
      { field: "razSoc", key: "razSoc", title: "Razon Social" },
      { field: "pais", key: "pais", title: "País" },
      { field: "rfc", key: "rfc", title: "RFC" },
      { field: "correo", key: "correo", title: "Correo" },
    ],
    exportName: "Sucursales",
    paperSize: "A4",
    margin: "1cm"
  };

  export const EstructuraClientes = {
    columns: [
      { field: "nom_p", key: "nom_p", title: "Nombre" },
      { field: "ap_p", key: "ap_p", title: "Apellido Paterno" },
      { field: "ap_m", key: "ap_m", title: "Apellido Materno" },
      { field: "telefono", key: "telefono", title: "Telefono" },
      { field: "ciudad", key: "ciudad", title: "Ciudad" },
    ],
    exportName: "Clientes",
    paperSize: "A4",
    margin: "1cm"
  };

  export const  EstructuraEmpleados = {
    columns: [
      { field: "nom_p", key: "nom_p", title: "Nombre" },
      { field: "ap_p", key: "ap_p", title: "Apellido Paterno" },
      { field: "ap_m", key: "ap_m", title: "Apellido Materno" },
      { field: "telefono", key: "telefono", title: "Telefono" },
      { field: "ciudad", key: "ciudad", title: "Ciudad" },
      { field: "emp_status", key: "emp_status", title: "Estatus" },
    ],
    exportName: "Clientes",
    paperSize: "A4",
    margin: "1cm"
  };

  export const  EstructuraVentas = {
    columns: [
      { field: "fecha_venta", key: "fecha_venta", title: "Fecha de Venta" },
      { field: "subtotal", key: "subtotal", title: "Subtotal" },
      { field: "iva", key: "iva", title: "IVA" },
      { field: "total", key: "total", title: "Total" },
      { field: "met_pago", key: "met_pago", title: "Metodo de Pago" },
    ],
    exportName: "Ventas",
    paperSize: "A4",
    margin: "1cm"
  };

  export const EstructuraProveedores = {
    columns: [
      { field: "razSoc", key: "razSoc", title: "Razon Social" },
      { field: "pais", key: "pais", title: "País" },
      { field: "rfc", key: "rfc", title: "RFC" },
      { field: "correo_prov", key: "correo_prov", title: "Correo" },
    ],
    exportName: "Proveedores",
    paperSize: "A4",
    margin: "1cm"
  };

  export const EstructuraProductos = {
    columns: [
      { field: "descr", key: "descr", title: "Descripcion" },
      { field: "cod_barra", key: "cod_barra", title: "Codigo de Barra" },
      { field: "prec_com", key: "prec_com", title: "Precio Compra" },
      { field: "prec_ven", key: "prec_ven", title: "Precio Venta" },
    ],
    exportName: "Productos",
    paperSize: "A4",
    margin: "1cm"
  };

  export const EstructuraCoctelerias = {
    columns: [
      { field: "nombre", key: "nombre", title: "Nombre" },
      { field: "descr", key: "descr", title: "Descripción" },
      { field: "mezcla", key: "mezcla", title: "Mezcla"},
      { field: "prec_vent", key: "prec_vent", title: "Precio Venta" },
    ],
    exportName: "COCTELERIAS",
    paperSize: "A4",
    margin: "1cm"
  };
