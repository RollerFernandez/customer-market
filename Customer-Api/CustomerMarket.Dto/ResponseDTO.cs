using Common;
using System;
using System.Collections.Generic;
using System.Text;
using static Common.Constants.Common;

namespace Dto
{
    public class ResponseDTO
    {
        public ResponseDTO()
        {
            this.status = EstadoRespuesta.OK;
            this.sucess = true;
            this.transactionId = DateTime.Now.ToString(Constants.Core.DateTimeFormats.DD_MM_YYYY_HH_MM_SS_FFF);
        }

        public string transactionId { get; set; }
        public int status { get; set; }
        public bool sucess { get; set; }
        public dynamic data { get; set; }
    }
}
