namespace API_AntonioWalls.DTOsucursal1
{
    public class DTOEmpleado: DTOPersona
    {
        public int IdEmpleado { get; set; }

        public string? Curp { get; set; }

        public string? Nss { get; set; }

        public DateTime? FechaAlta { get; set; }

        public string? EmpStatus { get; set; }

        public string? Puesto { get; set; }

        public decimal? Sueldo { get; set; }

        public int IdSucursal { get; set; }
    }
}
