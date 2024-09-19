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
    public class ProveedoresInstancia2 : ControllerBase
    {
        public readonly Sucursal2Context sucursal2Context;
        public readonly IMapper _mapper;

        public ProveedoresInstancia2(Sucursal2Context context, IMapper mapper)
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
                var proveedoresInstancia1s = sucursal2Context.Proveedores.ToList();
                List<DTOProveedores2> proveedoresDtos = null;

                try
                {
                    proveedoresDtos = _mapper.Map<List<DTOProveedores2>>(proveedoresInstancia1s);
                }
                catch (AutoMapperMappingException ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message, response = new List<DTOProveedores2>() });
                }

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", Response = proveedoresDtos });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message, response = new List<DTOProveedores2>() });
            }
        }

        [HttpGet]
        [Route("Obtener/{idProveedor:int}")]
        public IActionResult Obtener(int idProveedor)
        {
            try
            {


                var proveedor = sucursal2Context.Proveedores.Where(i => i.IdProv == idProveedor).FirstOrDefault();

                if (proveedor == null)
                {
                    return BadRequest("Proveedor no encontrado");
                }

                var dtoProveedor = _mapper.Map<DTOProveedores2>(proveedor);
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", Response = dtoProveedor });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }
        [HttpPost]
        [Route("Guardar")]
        public IActionResult Guardar([FromBody] DTOProveedores2 newProveedor)
        {
            try
            {
                var proveedor = _mapper.Map<Proveedores>(newProveedor);

                sucursal2Context.Proveedores.Add(proveedor);
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
        public IActionResult Editar([FromBody] DTOProveedores2 newProveedor)
        {
            var proveedor = sucursal2Context.Proveedores.Find(newProveedor.IdProv);
            if (proveedor == null)
            {
                return BadRequest("El proveedor no ha sido encontrado, no es posible editar");
            }

            try
            {
                // Solo actualiza los campos que no sean nulos
                _mapper.Map(newProveedor, proveedor);

                sucursal2Context.Proveedores.Update(proveedor);
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
        public IActionResult Eliminar(int idProveedor)
        {
            var proveedor = sucursal2Context.Proveedores.Find(idProveedor);

            if (proveedor == null)
            {
                return BadRequest("Proveedor no encontrado");
            }

            try
            {
                sucursal2Context.Proveedores.Remove(proveedor);
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
