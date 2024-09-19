using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_AntonioWalls.Models_Instancia1;
using API_AntonioWalls.DTOsucursal1;
using AutoMapper;

namespace API_AntonioWalls.Controllers_Instancia1
{
    [EnableCors("ReglasCors")]
    [Route("api/[controller]")]
    [ApiController]
    public class CocteleriaInstancia1 : ControllerBase
    {
        public readonly Sucursal1Context sucursal1Context;
        public readonly IMapper _mapper;

        public CocteleriaInstancia1(Sucursal1Context context, IMapper mapper)
        {
            sucursal1Context = context;
            _mapper = mapper;
        }
        [HttpGet]
        [Route("Lista")]
        public IActionResult Lista()
        {
            try
            {
                // Obtener la lista de categorías desde la base de datos
                var cocteleriaInstancia1s = sucursal1Context.Cocteleria.ToList();

                // Mapear la lista de entidades Categoria al DTOCategoria
                var cocteleriaDtos = _mapper.Map<List<DTOCocteleria>>(cocteleriaInstancia1s);

                // Retornar la lista mapeada al DTO
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = cocteleriaDtos });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message, response = new List<DTOCocteleria>() });
            }
        }


        [HttpGet]
        [Route("Obtener/{idCocteleria:int}")]
        public IActionResult Obtener(int idCocteleria)
        {
            try
            {
                // Buscar la entidad Categoria por Id
                var cocteleria = sucursal1Context.Cocteleria.Where(i => i.IdCoct == idCocteleria).FirstOrDefault();

                if (cocteleria == null)
                {
                    return BadRequest("Cocteleria no encontrada");
                }

                // Mapear la entidad Categoria al DTOCategoria usando AutoMapper
                var dtoCocteleria = _mapper.Map<DTOCocteleria>(cocteleria);

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", Response = dtoCocteleria });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }


        [HttpPost]
        [Route("Guardar")]
        public IActionResult Guardar([FromBody] DTOCocteleria newCocteleria)
        {
            try
            {
                // Mapeo automático usando AutoMapper
                var cocteleria = _mapper.Map<Cocteleria>(newCocteleria);

                sucursal1Context.Cocteleria.Add(cocteleria);
                sucursal1Context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }


        [HttpPut]
        [Route("Editar")]
        public IActionResult Editar([FromBody] DTOCocteleria newCocteleria)
        {
            var cocteleria = sucursal1Context.Cocteleria.Find(newCocteleria.IdCoct);
            if (cocteleria == null)
            {
                return BadRequest("La cocteleria no ha sido encontrada, no es posible editar");
            }

            try
            {
                // Mapeo los cambios del DTO a la entidad existente
                _mapper.Map(newCocteleria, cocteleria);

                sucursal1Context.Cocteleria.Update(cocteleria);
                sucursal1Context.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }

        [HttpDelete]
        [Route("Eliminar")]
        public IActionResult Eliminar(int idCocteleria)
        {
            var cocteleria = sucursal1Context.Cocteleria.Find(idCocteleria);

            if (cocteleria == null)
            {
                return BadRequest("Coctelería no encontrada");
            }

            try
            {
                sucursal1Context.Cocteleria.Remove(cocteleria);
                sucursal1Context.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }


        }
    }
}
