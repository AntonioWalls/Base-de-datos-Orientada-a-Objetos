using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Db4objects.Db4o;
using System.Linq;
using Db4objects.Db4o.Query;
using API_AntonioWalls.DTOsucursal1;

namespace API_AntonioWalls.Controllers_Instancia1
{
    [EnableCors("ReglasCors")]
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteInstancia1 : ControllerBase
    {
        // Constructor vacío, ya que no necesitas inyectar dependencias
        public ClienteInstancia1()
        {
        }

        // Muestra una lista de todos los clientes creados en la base de datos orientada a objetos
        [HttpGet]
        [Route("Lista")]
        public IActionResult Lista()
        {
            // Abre la base de datos db4o
            IObjectContainer BD = Db4oFactory.OpenFile("Baseson.yap");
            try
            {
                // Realiza una consulta de todos los objetos Cliente
                IList<Cliente> consulta = BD.Query<Cliente>();

                // Si hay resultados, retorna la lista con un mensaje de éxito
                if (consulta.Count > 0)
                {
                    consulta = consulta.ToList();
                    return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = consulta });
                }
                else
                {
                    // Retorno en caso de que no se encuentren clientes
                    return StatusCode(StatusCodes.Status404NotFound, new { mensaje = "No se encontraron clientes" });
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

        [HttpPut]
        [Route("Guardar")]
        public IActionResult Guardar()
        {
            try
            {

            }
            catch
            {

            }
            /*
             * [HttpPost]
        [Route("Guardar")]
        public IActionResult Guardar([FromBody] SucursalesDTO newSucursal)
        {
            try
            {
                var objeto = new Sucursales()
                {
                    IdSucursal = newSucursal.IdSucursal,
                    RazSoc = newSucursal.RazSoc,
                    Calle = newSucursal.Calle,
                    Num = newSucursal.Num,
                    Col = newSucursal.Col,
                    Ciudad = newSucursal.Ciudad,
                    Estado = newSucursal.Estado,
                    Pais = newSucursal.Pais,
                    Cp = newSucursal.Cp,
                    Presup = newSucursal.Presup,
                    TelefonoSuc = newSucursal.TelefonoSuc,
                    Rfc = newSucursal.Rfc,
                    Correo = newSucursal.Correo,
                    FechaAp = newSucursal.FechaAp,
                };
                linkedcontext.Sucursales.Add(objeto);
                linkedcontext.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message });

            }
        }
            */
        }

    }
}
