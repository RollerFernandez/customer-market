using System;

namespace Domain.Models.Common
{
    public class Entity
    {
        public int Id { get; set; }
        public string CreationUser { get; set; }
        public DateTime CreationDate { get; set; }
        public string ModificationUser { get; set; }
        public DateTime? ModificationDate { get; set; }
        public bool RowStatus { get; set; }
    }
}
