using System;
using System.Collections.Generic;

namespace API_AntonioWalls.Models_Instancia2;

public partial class Sucursales
{
    public int IdSucursal { get; set; }

    public string? RazSoc { get; set; }

    public string? Calle { get; set; }

    public int? Num { get; set; }

    public string? Col { get; set; }

    public string? Ciudad { get; set; }

    public string? Estado { get; set; }

    public string? Pais { get; set; }

    public int? Cp { get; set; }

    public decimal? Presup { get; set; }

    public string? TelefonoSuc { get; set; }

    public string? Rfc { get; set; }

    public string? Correo { get; set; }

    public DateTime? FechaAp { get; set; }

    public virtual ICollection<Cliente> Clientes { get; set; } = new List<Cliente>();

    public virtual ICollection<Empleado> Empleados { get; set; } = new List<Empleado>();

    public virtual ICollection<Venta> Venta { get; set; } = new List<Venta>();
}
