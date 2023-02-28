using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System.IO;

namespace CustomerMarket.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseStartup<Startup>().ConfigureServices(service => service.AddAutofac());

        private static IConfigurationRoot GetConfig()
        {
            var host = new WebHostBuilder();
            var env = host.GetSetting("environment");
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                //.addjsonfile("appsettings.json", optional: true, reloadonchange: true)
                //.addjsonfile($"appsettings.{env}.json", optional: true)
                .AddEnvironmentVariables();
            return builder.Build();
        }
    }
}
