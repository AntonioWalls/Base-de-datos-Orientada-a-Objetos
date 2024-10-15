using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Db4objects.Db4o;
using System.Linq;
using Db4objects.Db4o.Query;
using API_AntonioWalls.DTOsucursal1;
using Microsoft.Identity.Client;
using Newtonsoft.Json;


namespace API_AntonioWalls.Controllers_Instancia1
{
    [EnableCors("ReglasCors")]
    [Route("api/[controller]")]
    [ApiController]
    public class Cliente : ControllerBase
    {
        // Constructor vacío, ya que no necesitas inyectar dependencias
        public Cliente()
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

        [HttpGet]
        [Route("Obtener/{idCliente:int}")]
        public IActionResult Obtener(int idCliente)
        {
            // Abre la base de datos db4o
            IObjectContainer BD = Db4oFactory.OpenFile("Baseson.yap");
            try
            {
                // Buscar el cliente por su IdCliente usando Query LINQ
                DTOCliente cliente = BD.Query<DTOCliente>(x => x.IdCliente == idCliente).FirstOrDefault();

                // Verificar si se encontró el cliente
                if (cliente != null)
                {
                    return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = cliente });
                }
                else
                {
                    // Retorna si no se encontró el cliente con el ID proporcionado
                    return StatusCode(StatusCodes.Status404NotFound, new { mensaje = "Cliente no encontrado" });
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
                // Crear objeto a guardar
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
                return Ok(new { mensaje = "Cliente guardado correctamente." });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
            finally
            {
                BD.Close();
            }
        }


        [HttpPut]
        [Route("Editar")]
        public IActionResult Editar([FromBody] DTOCliente newCliente)
        {
            IObjectContainer BD = Db4oFactory.OpenFile("Baseson.yap");

            try
            {
                // Intenta buscar la entidad correcta (Cliente en lugar de DTOCliente)
                IList<DTOCliente> results = BD.Query<DTOCliente>(c => c.IdCliente == newCliente.IdCliente);

                if (results.Count == 0)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { mensaje = "No se encontraron clientes" });
                }

                DTOCliente cliente = results.First();

                // Actualiza los valores si no son nulos o vacíos
                cliente.ApM = newCliente.ApM is null ? cliente.ApM : newCliente.ApM;
                cliente.ApP = newCliente.ApP is null ? cliente.ApP : newCliente.ApP;
                cliente.NomP = newCliente.NomP is null ? cliente.NomP : newCliente.NomP;
                cliente.Calle = newCliente.Calle is null ? cliente.Calle : newCliente.Calle;
                cliente.Num = newCliente.Num is null ? cliente.Num : newCliente.Num;
                cliente.Col = newCliente.Col is null ? cliente.Col : newCliente.Col;
                cliente.Ciudad = newCliente.Ciudad is null ? cliente.Ciudad : newCliente.Ciudad;
                cliente.Estado = newCliente.Estado is null ? cliente.Estado : newCliente.Estado;
                cliente.Pais = newCliente.Pais is null ? cliente.Pais : newCliente.Pais;
                cliente.Cp = newCliente.Cp is null ? cliente.Cp : newCliente.Cp;
                cliente.Correo = newCliente.Correo is null ? cliente.Correo : newCliente.Correo;
                cliente.Telefono = newCliente.Telefono is null ? cliente.Telefono : newCliente.Telefono;
                cliente.Rfc = newCliente.Rfc is null ? cliente.Rfc : newCliente.Rfc;
                cliente.FechaReg = newCliente.FechaReg is null ? cliente.FechaReg : newCliente.FechaReg;
                cliente.IdSucursal = newCliente.IdSucursal == 0 ? cliente.IdSucursal : newCliente.IdSucursal;

                // Almacena los cambios
                BD.Store(cliente);
                BD.Commit();

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
            finally
            {
                BD.Close();
            }
        }

        [HttpDelete]
        [Route("Elminar/{idCliente:int}")]
        public IActionResult Eliminar(int idCliente)
        {
            IObjectContainer BD = Db4oFactory.OpenFile("Baseson.yap");

            try
            {
                IList<DTOCliente> results = BD.Query<DTOCliente>(c => c.IdCliente == idCliente);

                if (results.Count == 0)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { mensaje = "No se encontraron clientes" });
                }

                DTOCliente cliente = results.First();

                BD.Delete(cliente);

                BD.Commit();

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "Cliente eliminado correctamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
            finally { BD.Close(); }
        
        }
    }
}
