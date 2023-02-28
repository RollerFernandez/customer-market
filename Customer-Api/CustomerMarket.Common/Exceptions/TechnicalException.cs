using System;
using static Common.Constants.Common;

namespace Common.Exceptions
{
    [Serializable()]
    public class TechnicalException : CustomerException
    {
        public TechnicalException(string message) : base(EstadoRespuesta.ERROR_TECNICO, message)
        {
        }


        public TechnicalException(string message, dynamic data) : base(EstadoRespuesta.ERROR_TECNICO, message)
        {
            Data = data;
        }
    }
}
