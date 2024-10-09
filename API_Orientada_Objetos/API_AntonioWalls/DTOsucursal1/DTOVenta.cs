namespace API_AntonioWalls.DTOsucursal1
{
    public class DTOVenta
    {
        public int IdVenta { get; set; }

        public DateTime? FechaVenta { get; set; }

        public decimal? Subtotal { get; set; }

        public decimal? Iva { get; set; }

        public decimal? Total { get; set; }

        public string? MetPago { get; set; }

        public int IdSucursal { get; set; }
    }
}
