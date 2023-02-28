using Autofac;

using Repository.Implementations.Data;
using Repository.Interfaces.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyModel;
using System.Collections.Generic;
using System.Reflection;
using Repository.Implementations.Data.Base;
using Microsoft.OpenApi.Models;
using System.Linq;
using Repository.Interfaces;
using Repository.Implementations;
using Application.Interfaces.Customer;
using Application.Implementations.Customer;
using Service.Interfaces;
using Service.Implementations;

namespace CustomerMarket.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Customer Market",
                    Version = "v1"
                });
                c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First()); //This line
            });

            services.AddControllers();
            services.AddControllersWithViews().
              AddJsonOptions(options =>
              {
                  options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                  options.JsonSerializerOptions.PropertyNamingPolicy = null;
              });

            services.AddTransient(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            services.AddTransient<IUnitOfWork, UnitOfWork>();

            services.AddTransient<ICustomerRepository, CustomerRepository>();
            services.AddTransient<ICustomerApplication, CustomerApplication>();

            services.AddTransient<INotificactionServices, NotificationServices>();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseDeveloperExceptionPage();

            app.UseCors(x => x
             .AllowAnyOrigin()
             .AllowAnyMethod()
             .AllowAnyHeader());

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseAuthorization();
            app.UseStaticFiles();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
                c.DocumentTitle = "Customer";
            });

        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            var assemblies = new List<Assembly>();
            var dependencies = DependencyContext.Default.RuntimeLibraries;
            foreach (var library in dependencies)
            {
                if (library.Name.StartsWith("Customer"))
                {
                    var assembly = Assembly.Load(new AssemblyName(library.Name));
                    assemblies.Add(assembly);
                }
            }

            var assembliesArray = assemblies.ToArray();
            builder.RegisterAssemblyTypes(assembliesArray).Where(t => t.Name.EndsWith("Service")).AsImplementedInterfaces().InstancePerDependency();
            builder.RegisterAssemblyTypes(assembliesArray).Where(t => t.Name.EndsWith("Repository")).AsImplementedInterfaces().InstancePerDependency();
            builder.RegisterAssemblyTypes(assembliesArray).Where(t => t.Name.EndsWith("Application")).AsImplementedInterfaces().InstancePerDependency();

            Autofac.IContainer container = null;
            builder.Register(c => container).AsSelf().SingleInstance();

            builder.RegisterGeneric(typeof(BaseRepository<>)).As(typeof(IBaseRepository<>)).InstancePerDependency();
            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>().InstancePerLifetimeScope();
            builder.RegisterType<HttpContextAccessor>().As<IHttpContextAccessor>().SingleInstance();
        }
    }
}
