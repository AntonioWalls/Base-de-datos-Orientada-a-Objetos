using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Db4objects.Db4o;
using System.Linq;
using Db4objects.Db4o.Query;
using API_AntonioWalls.DTOsucursal1;
using Microsoft.Identity.Client;

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
                IList<DTOCliente> consulta = BD.Query<DTOCliente>();

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

        [HttpPost]
        [Route("Guardar")]
        public IActionResult Guardar([FromBody] DTOCliente newCliente)
        {
            IObjectContainer BD = Db4oFactory.OpenFile("Baseson.yap");
            try
            {
                DTOCliente objeto = new DTOCliente
                {
                    IdCliente = newCliente.IdCliente,
                    NomP = newCliente.NomP,
                    ApP = newCliente.ApP,
                    ApM = newCliente.ApM,
                    Calle = newCliente.Calle,
                    Num = newCliente.Num,
                    Col = newCliente.Col,
                    Ciudad = newCliente.Ciudad,
                    Estado = newCliente.Estado,
                    Pais = newCliente.Pais,
                    Cp = newCliente.Cp,
                    Correo = newCliente.Correo,
                    Telefono = newCliente.Telefono,
                    Rfc = newCliente.Rfc,
                    FechaReg = newCliente.FechaReg,
                    IdSucursal = newCliente.IdSucursal,
                };
                BD.Store(objeto);
                BD.Commit();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message });
            }
            finally
            {
                BD.Close();
            } 
        }

        [HttpPut]
        [Route("Editar")]
        public IActionResult Editar([FromBody] DTOCliente newCliente, int clave)
        {
            IObjectContainer BD = Db4oFactory.OpenFile("SuperDB.yap");

            try
            {
                IList<DTOCliente> results = BD.Query<DTOCliente>(c => c.IdCliente == newCliente.IdCliente);
            
                if (results.Count == 0)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { mensaje = "No se encontraron clientes" });
                }
            
            
            
            }catch (Exception ex)
            {

            }

            
        
                
                
        }

    }
}
