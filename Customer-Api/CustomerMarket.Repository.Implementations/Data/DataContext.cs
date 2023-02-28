using Microsoft.EntityFrameworkCore;
using Domain.Models.Entities;
using Repository.Implementations.Configurations.Customer;

namespace Repository.Implementations.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            builder.ApplyConfiguration(new CustomerConfiguration(builder));
        }

        public DbSet<CustomerEntity> Customer { get; set; }
    }

}
