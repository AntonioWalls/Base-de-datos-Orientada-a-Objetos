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
    public class CocteleriaInstancia2 : ControllerBase
    {
        public readonly Sucursal2Context sucursal2Context;
        public readonly IMapper _mapper;

        public CocteleriaInstancia2(Sucursal2Context context, IMapper mapper)
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
                // Obtener la lista de categorías desde la base de datos
                var cocteleriaInstancia1s = sucursal2Context.Cocteleria.ToList();

                // Mapear la lista de entidades Categoria al DTOCategoria
                var cocteleriaDtos = _mapper.Map<List<DTOCocteleria2>>(cocteleriaInstancia1s);

                // Retornar la lista mapeada al DTO
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = cocteleriaDtos });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message, response = new List<DTOCocteleria2>() });
            }
        }


        [HttpGet]
        [Route("Obtener/{idCocteleria:int}")]
        public IActionResult Obtener(int idCocteleria)
        {
            try
            {
                // Buscar la entidad Categoria por Id
                var cocteleria = sucursal2Context.Cocteleria.Where(i => i.IdCoct == idCocteleria).FirstOrDefault();

                if (cocteleria == null)
                {
                    return BadRequest("Cocteleria no encontrada");
                }

                // Mapear la entidad Categoria al DTOCategoria usando AutoMapper
                var dtoCocteleria = _mapper.Map<DTOCocteleria2>(cocteleria);

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", Response = dtoCocteleria });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }


        [HttpPost]
        [Route("Guardar")]
        public IActionResult Guardar([FromBody] DTOCocteleria2 newCocteleria)
        {
            try
            {
                // Mapeo automático usando AutoMapper
                var cocteleria = _mapper.Map<Cocteleria>(newCocteleria);

                sucursal2Context.Cocteleria.Add(cocteleria);
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
        public IActionResult Editar([FromBody] DTOCocteleria2 newCocteleria)
        {
            var cocteleria = sucursal2Context.Cocteleria.Find(newCocteleria.IdCoct);
            if (cocteleria == null)
            {
                return BadRequest("La cocteleria no ha sido encontrada, no es posible editar");
            }

            try
            {
                // Mapeo los cambios del DTO a la entidad existente
                _mapper.Map(newCocteleria, cocteleria);

                sucursal2Context.Cocteleria.Update(cocteleria);
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
        public IActionResult Eliminar(int idCocteleria)
        {
            var cocteleria = sucursal2Context.Cocteleria.Find(idCocteleria);

            if (cocteleria == null)
            {
                return BadRequest("Coctelería no encontrada");
            }

            try
            {
                sucursal2Context.Cocteleria.Remove(cocteleria);
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
