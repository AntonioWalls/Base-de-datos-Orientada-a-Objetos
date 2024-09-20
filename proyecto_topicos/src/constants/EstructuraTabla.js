
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
      { field: "nomP", key: "nomP", title: "Nombre" },
      { field: "apP", key: "apP", title: "Apellido Paterno" },
      { field: "apM", key: "apM", title: "Apellido Materno" },
      { field: "telefono", key: "telefono", title: "Telefono" },
      { field: "ciudad", key: "ciudad", title: "Ciudad" },
    ],
    exportName: "Clientes",
    paperSize: "A4",
    margin: "1cm"
  };

  export const  EstructuraEmpleados = {
    columns: [
      { field: "nomP", key: "nomP", title: "Nombre" },
      { field: "apP", key: "apP", title: "Apellido Paterno" },
      { field: "apM", key: "apM", title: "Apellido Materno" },
      { field: "telEmp", key: "telEmp", title: "Telefono" },
      { field: "ciudad", key: "ciudad", title: "Ciudad" },
      { field: "empStatus", key: "empStatus", title: "Estatus" },
    ],
    exportName: "Clientes",
    paperSize: "A4",
    margin: "1cm"
  };

  export const  EstructuraVentas = {
    columns: [
      { field: "fechaVenta", key: "fechaVenta", title: "Fecha de Venta" },
      { field: "subtotal", key: "subtotal", title: "Subtotal" },
      { field: "iva", key: "iva", title: "IVA" },
      { field: "total", key: "total", title: "Total" },
      { field: "metPago", key: "metPago", title: "Metodo de Pago" },
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
      { field: "correoProv", key: "correoProv", title: "Correo" },
    ],
    exportName: "Proveedores",
    paperSize: "A4",
    margin: "1cm"
  };

  export const EstructuraProductos = {
    columns: [
      { field: "descr", key: "descr", title: "Descripcion" },
      { field: "codBarra", key: "codBarra", title: "Codigo de Barra" },
      { field: "precCom", key: "precCom", title: "Precio Compra" },
      { field: "precVen", key: "precVen", title: "Precio Venta" },
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
      { field: "precVent", key: "precVent", title: "Precio Venta" },
    ],
    exportName: "Coctelerias",
    paperSize: "A4",
    margin: "1cm"
  };
