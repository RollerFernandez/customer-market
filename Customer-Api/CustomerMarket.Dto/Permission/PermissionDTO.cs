
using System;

namespace Dto.Permission
{
   public class PermissionDTO
    {
        public int Id { get; set; }
        public string NombreEmpleado { get; set; }
        public string ApellidoEmpleado { get; set; }
        public DateTime FechaPermiso { get; set; }
        public int TipoPermiso { get; set; }

    }
}
