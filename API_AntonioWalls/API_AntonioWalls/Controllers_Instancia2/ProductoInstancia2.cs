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
    [EnableCors("ReglasCors")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoInstancia2 : ControllerBase
    {
        public readonly Sucursal2Context sucursal2Context;
        public readonly IMapper _mapper;

        public ProductoInstancia2(Sucursal2Context context, IMapper mapper)
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
                var produductoInstancia1s = sucursal2Context.Productos.ToList();
                List<DTOProducto2> produdctoDtos = null;

                try
                {
                    produdctoDtos = _mapper.Map<List<DTOProducto2>>(produductoInstancia1s);
                }
                catch (AutoMapperMappingException ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message, response = new List<DTOProducto2>() });
                }

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", Response = produdctoDtos });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message, response = new List<DTOEmpleado2>() });
            }
        }

        [HttpGet]
        [Route("Obtener/{idProducto:int}")]
        public IActionResult Obtener(int idProducto)
        {
            try
            {


                var producto = sucursal2Context.Productos.Where(i => i.IdProd == idProducto).FirstOrDefault();

                if (producto == null)
                {
                    return BadRequest("Producto no encontrado");
                }

                var dtoProducto = _mapper.Map<DTOProducto2>(producto);
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", Response = dtoProducto });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }
        [HttpPost]
        [Route("Guardar")]
        public IActionResult Guardar([FromBody] DTOProducto2 newProducto)
        {
            try
            {
                var producto = _mapper.Map<Producto>(newProducto);

                sucursal2Context.Productos.Add(producto);
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
        public IActionResult Editar([FromBody] DTOProducto2 newProducto)
        {
            var producto = sucursal2Context.Productos.Find(newProducto.IdProd);
            if (producto == null)
            {
                return BadRequest("El producto no ha sido encontrado, no es posible editar");
            }

            try
            {
                // Solo actualiza los campos que no sean nulos
                _mapper.Map(newProducto, producto);

                sucursal2Context.Productos.Update(producto);
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
        public IActionResult Eliminar(int idProducto)
        {
            var producto = sucursal2Context.Productos.Find(idProducto);

            if (producto == null)
            {
                return BadRequest("Producto no encontrado");
            }

            try
            {
                sucursal2Context.Productos.Remove(producto);
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
