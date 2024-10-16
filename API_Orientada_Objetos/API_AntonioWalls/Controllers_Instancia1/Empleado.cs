using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Db4objects.Db4o;
using System.Linq;
using Db4objects.Db4o.Query;
using API_AntonioWalls.DTOsucursal1;
using Microsoft.Identity.Client;
using Db4objects.Db4o.Reflect;

namespace API_AntonioWalls.Controllers_Instancia1
{
    [EnableCors("ReglasCors")]
    [Route("api/[controller]")]
    [ApiController]
    public class Empleado : ControllerBase
    {
        public Empleado() { }


        [HttpGet]
        [Route("Lista")]
        public IActionResult Lista()
        {
            IObjectContainer BD = Db4oFactory.OpenFile("Baseson.yap");

            try
            {
                IList<DTOEmpleado> consulta = BD.Query<DTOEmpleado>();

                if (consulta.Count > 0)
                {
                    consulta = consulta.ToList();
                    return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", Response = consulta });
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { mensaje = "No se encontraron empleados" });
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
            finally { BD.Close(); }
        }

        [HttpGet]
        [Route("ObtenerEmpleado/{idEmpleado:int}")]
        public IActionResult ObtenerEmpleado(int idEmpleado)
        {
            // Abre la base de datos db4o
            IObjectContainer BD = Db4oFactory.OpenFile("Baseson.yap");
            try
            {
                // Buscar el empleado por su IdEmpleado usando Query LINQ
                DTOEmpleado empleado = BD.Query<DTOEmpleado>(x => x.IdEmpleado == idEmpleado).FirstOrDefault();

                // Verificar si se encontró el empleado
                if (empleado != null)
                {
                    return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = empleado });
                }
                else
                {
                    // Retorna si no se encontró el empleado con el ID proporcionado
                    return StatusCode(StatusCodes.Status404NotFound, new { mensaje = "Empleado no encontrado" });
                }
            }
            catch (Exception ex)
            {
                // Retorna error en caso de excepción
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
            finally
            {
                // Cerrar la base de datos para evitar fugas de recursos
                BD.Close();
            }
        }



        [HttpPost]
        [Route("Guardar")]
        public IActionResult Guardar([FromBody] DTOEmpleado newEmpleado)
        {
            IObjectContainer BD = Db4oFactory.OpenFile("Baseson.yap");
            try
            {
                DTOEmpleado objeto = new DTOEmpleado
                {
                    IdEmpleado = newEmpleado.IdEmpleado,
                    NomP = newEmpleado.NomP,
                    ApP = newEmpleado.ApP,
                    ApM = newEmpleado.ApM,
                    Calle = newEmpleado.Calle,
                    Num = newEmpleado.Num,
                    Col = newEmpleado.Col,
                    Ciudad = newEmpleado.Ciudad,
                    Estado = newEmpleado.Estado,
                    Pais = newEmpleado.Pais,
                    Cp = newEmpleado.Cp,
                    Correo = newEmpleado.Correo,
                    Telefono = newEmpleado.Telefono,
                    Rfc = newEmpleado.Rfc,
                    Curp = newEmpleado.Curp,
                    Nss = newEmpleado.Nss,
                    FechaAlta = newEmpleado.FechaAlta,
                    EmpStatus = newEmpleado.EmpStatus,
                    Puesto = newEmpleado.Puesto,
                    Sueldo = newEmpleado.Sueldo,
                    IdSucursal = newEmpleado.IdSucursal,
                };
                BD.Store(objeto);
                BD.Commit();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
            finally { BD.Close(); }

        }

        [HttpPut]
        [Route("Editar")]
        public IActionResult Editar([FromBody] DTOEmpleado newEmpleado)
        {
            IObjectContainer BD = Db4oFactory.OpenFile("Baseson.yap");

            try
            {
            IList<DTOEmpleado> results = BD.Query<DTOEmpleado>(c => c.IdEmpleado == newEmpleado.IdEmpleado);
            
            if (results.Count == 0)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { mensaje = "No se encontraron empleados" });
                }
                DTOEmpleado empleado = results.First();

                empleado.ApM = newEmpleado.ApM is null ? empleado.ApM : newEmpleado.ApM;
                empleado.ApP = newEmpleado.ApP is null ? empleado.ApP : newEmpleado.ApP;
                empleado.NomP = newEmpleado.NomP is null ? empleado.NomP : newEmpleado.NomP;
                empleado.Calle = newEmpleado.Calle is null ? empleado.Calle : newEmpleado.Calle;
                empleado.Num = newEmpleado.Num is null ? empleado.Num : newEmpleado.Num;
                empleado.Col = newEmpleado.Col is null ? empleado.Col : newEmpleado.Col;
                empleado.Ciudad = newEmpleado.Ciudad is null ? empleado.Ciudad : newEmpleado.Ciudad;
                empleado.Estado = newEmpleado.Estado is null ? empleado.Estado : newEmpleado.Estado;
                empleado.Pais = newEmpleado.Pais is null ? empleado.Pais : newEmpleado.Pais;
                empleado.Cp = newEmpleado.Cp is null ? empleado.Cp : newEmpleado.Cp;
                empleado.Correo = newEmpleado.Correo is null ? empleado.Correo : newEmpleado.Correo;
                empleado.Telefono = newEmpleado.Telefono is null ? empleado.Telefono : newEmpleado.Telefono;
                empleado.Rfc = newEmpleado.Rfc is null ? empleado.Rfc : newEmpleado.Rfc;
                empleado.Curp = newEmpleado.Curp is null ? empleado.Curp : newEmpleado.Curp;
                empleado.Nss = newEmpleado.Nss is null ? empleado.Nss : newEmpleado.Nss;
                empleado.FechaAlta = newEmpleado.FechaAlta is null ? empleado.FechaAlta : newEmpleado.FechaAlta;
                empleado.EmpStatus = newEmpleado.EmpStatus is null ? empleado.EmpStatus : newEmpleado.EmpStatus;
                empleado.Puesto = newEmpleado.Puesto is null ? empleado.Puesto : newEmpleado.Puesto;
                empleado.Sueldo = newEmpleado.Sueldo is null ? empleado.Sueldo : newEmpleado.Sueldo;
                empleado.IdSucursal = newEmpleado.IdSucursal == 0 ? empleado.IdSucursal : newEmpleado.IdSucursal;
           
                BD.Store(empleado);
                BD.Commit();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
            finally { BD.Close(); }
        }

        [HttpDelete]
        [Route("Elminar/{idEmpleado:int}")]
        public IActionResult Eliminar(int idEmpleado)
        {
            IObjectContainer BD = Db4oFactory.OpenFile("Baseson.yap");

            try
            {
                IList<DTOEmpleado> results = BD.Query<DTOEmpleado>(c => c.IdEmpleado == idEmpleado);

                if (results.Count == 0)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { mensaje = "No se encontraron empleados" });
                }

                DTOEmpleado empleado = results.First();

                BD.Delete(empleado);

                BD.Commit();

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "empleado eliminado correctamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
            finally { BD.Close(); }

        }
    }
}
