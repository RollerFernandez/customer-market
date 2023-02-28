using Microsoft.EntityFrameworkCore;
using System;

namespace Repository.Interfaces.Data
{
    public interface IUnitOfWork : IDisposable
    {
        void SaveChanges();

        bool HasChanges();

        void Dispose(bool disposing);

        T Repository<T>() where T : class;

        DbSet<TEntity> Set<TEntity>() where TEntity : class;

        DbContext Get();

    }
}
