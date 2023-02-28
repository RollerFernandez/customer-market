
using FluentValidation;
//using Repository.Implementations.Data;
//using Repository.Implementations.Data.Base;
//using Repository.Interfaces.Data;
using System.Reflection;
//using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());
builder.Services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

var assemblies = new List<Assembly>();
//var dependencies = DependencyContext.Default.RuntimeLibraries;
//foreach (var library in dependencies)
//{
//    if (library.Name.StartsWith("Ripley"))
//    {
//        var assembly = Assembly.Load(new AssemblyName(library.Name));
//        assemblies.Add(assembly);
//    }
//}

var assembliesArray = assemblies.ToArray();
//builder.RegisterAssemblyTypes(assembliesArray).Where(t => t.Name.EndsWith("Service")).AsImplementedInterfaces().InstancePerDependency();
//builder.RegisterAssemblyTypes(assembliesArray).Where(t => t.Name.EndsWith("Repository")).AsImplementedInterfaces().InstancePerDependency();
//builder.RegisterAssemblyTypes(assembliesArray).Where(t => t.Name.EndsWith("Application")).AsImplementedInterfaces().InstancePerDependency();



//builder.RegisterGeneric(typeof(BaseRepository<>)).As(typeof(IBaseRepository<>)).InstancePerDependency();
//builder.RegisterType<UnitOfWork>().As<IUnitOfWork>().InstancePerLifetimeScope();
//builder.RegisterType<HttpContextAccessor>().As<IHttpContextAccessor>().SingleInstance();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
