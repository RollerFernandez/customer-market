using Common.Configurations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;

namespace Extensions
{
    public static class JWTExtension
    {
        public static void AddJWTExtesion(this IServiceCollection services, IConfiguration configuration, string authenticateScheme)
        {
            var appSettingsSection = configuration.GetSection("AppSettings");
            var appSettings = appSettingsSection.Get<AppSettings>();

            var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(appSettings.JWTokenConfiguration.Secret));
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = signingKey,
                ValidateIssuer = true,
                ValidIssuer = appSettings.JWTokenConfiguration.Iss,
                ValidateAudience = true,
                ValidAudience = appSettings.JWTokenConfiguration.Aud,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero,
                RequireExpirationTime = true,
            };

            services.AddAuthentication(o =>
            {
                o.DefaultAuthenticateScheme = authenticateScheme;
            });
           //.AddJwtBearer(authenticateScheme, x =>
           //{
           //    x.RequireHttpsMetadata = false;
           //    x.TokenValidationParameters = tokenValidationParameters;
           //});
        }
    }
}
