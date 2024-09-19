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
    public class EmpleadoInstancia2 : ControllerBase
    {
        public readonly Sucursal2Context sucursal2Context;
        public readonly IMapper _mapper;

        public EmpleadoInstancia2(Sucursal2Context context, IMapper mapper)
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
                var empleadoInstancia2s = sucursal2Context.Empleados.ToList();
                List<DTOEmpleado2> empleadoDtos = null;

                try
                {
                    empleadoDtos = _mapper.Map<List<DTOEmpleado2>>(empleadoInstancia2s);
                }
                catch (AutoMapperMappingException ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message, response = new List<DTOEmpleado2>() });
                }

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", Response = empleadoDtos });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message, response = new List<DTOEmpleado2>() });
            }
        }

        [HttpGet]
        [Route("Obtener/{idEmpleado:int}")]
        public IActionResult Obtener(int idEmpleado)
        {
            try
            {


                var empleado = sucursal2Context.Empleados.Where(i => i.IdEmpleado == idEmpleado).FirstOrDefault();

                if (empleado == null)
                {
                    return BadRequest("Empleado no encontrado");
                }

                var dtoEmpleado = _mapper.Map<DTOEmpleado2>(empleado);
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", Response = dtoEmpleado });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }
        [HttpPost]
        [Route("Guardar")]
        public IActionResult Guardar([FromBody] DTOEmpleado2 newEmpleado)
        {
            try
            {
                var empleado = _mapper.Map<Empleado>(newEmpleado);

                sucursal2Context.Empleados.Add(empleado);
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
        public IActionResult Editar([FromBody] DTOEmpleado2 newEmpleado)
        {
            var empleado = sucursal2Context.Empleados.Find(newEmpleado.IdEmpleado);
            if (empleado == null)
            {
                return BadRequest("El empleado no ha sido encontrado, no es posible editar");
            }

            try
            {
                // Solo actualiza los campos que no sean nulos
                _mapper.Map(newEmpleado, empleado);

                sucursal2Context.Empleados.Update(empleado);
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
        public IActionResult Eliminar(int idEmpleado)
        {
            var empleado = sucursal2Context.Empleados.Find(idEmpleado);

            if (empleado == null)
            {
                return BadRequest("Empleado no encontrado");
            }

            try
            {
                sucursal2Context.Empleados.Remove(empleado);
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
