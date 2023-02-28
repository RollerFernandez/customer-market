using Microsoft.EntityFrameworkCore;
using Repository.Interfaces.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Repository.Implementations.Data.Base
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        private DbSet<T> entity;
        private readonly DataContext context;

        public BaseRepository(DataContext context)
        {
            this.context = context;
            entity = context.Set<T>();
        }

        public async Task<T> GetById(int id) => await entity.FindAsync(id);

        public Task<T> FirstOrDefault(Expression<Func<T, bool>> predicate)
            => entity.FirstOrDefaultAsync(predicate);

        public async Task<IEnumerable<T>> GetAll()
        {
            return await entity.AsQueryable().ToListAsync();
        }

        public async Task<IEnumerable<T>> GetWhere(Expression<Func<T, bool>> predicate)
        {
            return await entity.AsQueryable().Where(predicate).ToListAsync();
        }

        public Task<int> CountAll() => entity.AsQueryable().CountAsync();

        public Task<int> CountWhere(Expression<Func<T, bool>> predicate) => entity.CountAsync(predicate);
    }
}
