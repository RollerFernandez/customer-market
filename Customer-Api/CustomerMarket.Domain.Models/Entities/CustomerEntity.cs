
using System;

namespace Domain.Models.Entities
{
    public class CustomerEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string CellPhone { get; set; }
        public string Email { get; set; }
    }
}
