using Autofac;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Common;
using Common.Configurations;
using Domain.Models.Common;
using Repository.Interfaces.Data;
using Repository.Implementations.Data;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Repository.Implementations.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        private readonly string _uriElasticSearch;
        private readonly IHttpContextAccessor _httpContext;
        private readonly AppSettings _settings;
        private readonly ILifetimeScope _lifetimeScope;

        private Dictionary<Type, object> repositories;
        private bool _disposed;
        public Func<DateTime> CurrentDateTime { get; set; } = () => DateTime.Now;

        public  IConfiguration _configuration { get; set; }
        public UnitOfWork(ILifetimeScope lifetimeScope,IConfiguration configuration)
        {
            _configuration = configuration;
            _httpContext = lifetimeScope.Resolve<IHttpContextAccessor>();
            _settings = lifetimeScope.Resolve<IOptions<AppSettings>>().Value;
            _lifetimeScope = lifetimeScope;
            _context = new DataContext(new DbContextOptionsBuilder<DataContext>().UseSqlServer(configuration.GetSection("AppSettings:DatabaseConfiguration:SqlServer:ConnectionStrings:DefaultConnection").Value).Options);
         }

        public DbContext Get()
        {
            return _context;
        }

        public T Repository<T>() where T : class
        {
            return _lifetimeScope.Resolve<T>(new NamedParameter("context", _context));
        }

        public void SaveChanges()
        {
            TrackChanges();
            _context.SaveChanges();
        }

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }

        private void TrackChanges()
        {
            if (_context.ChangeTracker.Entries().Any(e => e.State == EntityState.Added || e.State == EntityState.Modified))
            {
                var identity = _httpContext?.HttpContext?.User.FindFirst(Constants.Core.Token.CURRENT_USER)?.Value ?? Constants.Core.Audit.SYSTEM;

                foreach (var entry in _context.ChangeTracker.Entries().AsQueryable().Where(e => e.State == EntityState.Added || e.State == EntityState.Modified))
                {
                    var entidad = entry.Entity as Entity;
                    if (entry.State == EntityState.Added)
                    {
                        if (entry.Metadata.FindProperty(Constants.Core.Audit.CREATION_USER) != null)
                            entry.CurrentValues[Constants.Core.Audit.CREATION_USER] = identity;

                        if (entry.Metadata.FindProperty(Constants.Core.Audit.CREATION_DATE) != null)
                            entry.CurrentValues[Constants.Core.Audit.CREATION_DATE] = CurrentDateTime();

                        if (entry.Metadata.FindProperty(Constants.Core.Audit.ROW_STATUS) != null)
                            entry.CurrentValues[Constants.Core.Audit.ROW_STATUS] = true;
                    }
                    if (entry.State == EntityState.Modified)
                    {
                        if (entry.Metadata.FindProperty(Constants.Core.Audit.MODIFICATION_USER) != null)
                            entry.CurrentValues[Constants.Core.Audit.MODIFICATION_USER] = identity;

                        if (entry.Metadata.FindProperty(Constants.Core.Audit.MODIFICATION_DATE) != null)
                            entry.CurrentValues[Constants.Core.Audit.MODIFICATION_DATE] = CurrentDateTime();
                    }
                }
            }
        }

        public DbSet<TEntity> Set<TEntity>() where TEntity : class
        {
            return _context.Set<TEntity>();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public void Dispose(bool disposing)
        {
            if (!_disposed)
                if (disposing)
                {
                    if (repositories != null)
                        repositories.Clear();

                    _context.Dispose();
                }

            _disposed = true;
        }
    }
}
