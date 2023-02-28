using System;
using static Common.Constants.Common;

namespace Common.Exceptions
{
    [Serializable()]
    public class FunctionalException : CustomerException
    {
        public FunctionalException(string message) : base(EstadoRespuesta.ERROR_FUNCIONAL, message)
        {
        }

        public FunctionalException(string message, dynamic data) : base(EstadoRespuesta.ERROR_FUNCIONAL, message)
        {
            Data = data;
        }
    }
}
