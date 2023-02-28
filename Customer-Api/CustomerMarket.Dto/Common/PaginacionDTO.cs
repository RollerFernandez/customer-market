using System.Collections.Generic;

namespace Dto.Common
{
    public class PaginacionDTO<T> where T : class
    {
        public int pages { get; set; }
        public int total { get; set; }
        public List<T> items { get; set; }

    }
}
