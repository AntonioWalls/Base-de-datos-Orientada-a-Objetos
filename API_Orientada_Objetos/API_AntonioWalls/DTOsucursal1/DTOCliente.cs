namespace API_AntonioWalls.DTOsucursal1
{
    public class DTOCliente: DTOPersona
    {
        public int IdCliente { get; set; }

        public DateTime? FechaReg { get; set; }

        public int IdSucursal { get; set; }
    }
}
