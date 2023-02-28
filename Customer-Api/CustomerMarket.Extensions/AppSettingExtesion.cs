using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Common.Configurations;

namespace Extensions
{
    public static class AppSettingExtesion
    {
        public static IConfigurationSection AddAppSettingExtesion(this IServiceCollection services, IConfiguration configuration)
        {
            var appSettingsSection = configuration.GetSection("AppSettings");

            services.Configure<AppSettings>(appSettingsSection);

            services.AddSingleton(cfg => cfg.GetService<IOptions<AppSettings>>().Value);

            return appSettingsSection;
        }
    }
}
