
using Domain.Models.Entities;
using Repository.Implementations.Configurations.Base;
using Microsoft.EntityFrameworkCore;

namespace Repository.Implementations.Configurations.Customer
{
    public class CustomerConfiguration : EntityConfiguration<CustomerEntity>
    {
        public CustomerConfiguration(ModelBuilder builder)
        {
            var entityBuilder = builder.Entity<CustomerEntity>();
            object p = entityBuilder.ToTable("customer", "managements");
            entityBuilder.HasKey(c => c.Id);
            entityBuilder.Property(c => c.Name).HasColumnName("Name");
            entityBuilder.Property(c => c.LastName).HasColumnName("LastName");
            entityBuilder.Property(c => c.Address).HasColumnName("Address");
            entityBuilder.Property(c => c.CellPhone).HasColumnName("CellPhone");
            Configure(entityBuilder);
        }
    }
}
