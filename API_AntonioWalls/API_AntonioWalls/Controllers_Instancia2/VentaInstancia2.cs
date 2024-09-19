using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_AntonioWalls.Models_Instancia2;
using AutoMapper;
using API_AntonioWalls.Mappings;
using API_AntonioWalls.DTOsucursal2;

namespace API_AntonioWalls.Controllers_Instancia2
{
    [Route("api/[controller]")]
    [ApiController]
    public class VentaInstancia2 : ControllerBase
    {
        public readonly Sucursal2Context sucursal2Context;
        private readonly IMapper _mapper;

        public VentaInstancia2(Sucursal2Context context, IMapper mapper)
        {
            sucursal2Context = context;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("Lista")]
        public IActionResult Lista()
        {
            try
            {
                var VentaInstancia1s = sucursal2Context.Ventas.ToList();
                List<DTOVenta2> ventaDtos = null;

                try
                {
                    ventaDtos = _mapper.Map<List<DTOVenta2>>(VentaInstancia1s);
                }
                catch (AutoMapperMappingException ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message, response = new List<DTOVenta2>() });
                }

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", Response = ventaDtos });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message, response = new List<DTOVenta2>() });
            }
        }

        [HttpGet]
        [Route("Obtener/{idVenta:int}")]
        public IActionResult Obtener(int idVenta)
        {
            try
            {


                var venta = sucursal2Context.Ventas.Where(i => i.IdVenta == idVenta).FirstOrDefault();

                if (venta == null)
                {
                    return BadRequest("Venta no encontrada");
                }

                var dtoVenta = _mapper.Map<DTOVenta2>(venta);
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", Response = dtoVenta });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }
        [HttpPost]
        [Route("Guardar")]
        public IActionResult Guardar([FromBody] DTOVenta2 newVenta)
        {
            try
            {
                var venta = _mapper.Map<Venta>(newVenta);

                sucursal2Context.Ventas.Add(venta);
                sucursal2Context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }

        [HttpPut]
        [Route("Editar")]
        public IActionResult Editar([FromBody] DTOVenta2 newVenta)
        {
            var venta = sucursal2Context.Ventas.Find(newVenta.IdVenta);
            if (venta == null)
            {
                return BadRequest("La venta no ha sido encontrado, no es posible editar");
            }

            try
            {
                // Solo actualiza los campos que no sean nulos
                _mapper.Map(newVenta, venta);

                sucursal2Context.Ventas.Update(venta);
                sucursal2Context.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }


        [HttpDelete]
        [Route("Eliminar")]
        public IActionResult Eliminar(int idVenta)
        {
            var venta = sucursal2Context.Empleados.Find(idVenta);

            if (venta == null)
            {
                return BadRequest("Venta no encontrado");
            }

            try
            {
                sucursal2Context.Empleados.Remove(venta);
                sucursal2Context.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }

    }
}
