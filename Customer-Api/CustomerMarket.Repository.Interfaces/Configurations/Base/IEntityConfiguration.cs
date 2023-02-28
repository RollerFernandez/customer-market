using Microsoft.EntityFrameworkCore;
namespace Repository.Interfaces.Configurations.Base
{
    public interface IEntityConfiguration<T> : IEntityTypeConfiguration<T> where T : class
    {
    }
}
