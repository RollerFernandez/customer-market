using System;
using System.Runtime.Serialization;

namespace Common.Exceptions
{
    public class CustomerException : Exception, ISerializable
    {
        public string TransactionId { get; }
        public int Status { get; }
        public dynamic Data { get; set; }

        public CustomerException(int statusCode, string message) : base(message)
        {
            Status = statusCode;
            TransactionId = DateTime.Now.ToString(Constants.Core.DateTimeFormats.DD_MM_YYYY_HH_MM_SS_FFF);

        }
    }
}
