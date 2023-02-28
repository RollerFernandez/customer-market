using Azure.Communication;
using Microsoft.Azure.NotificationHubs;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Service.Implementations
{
    public class NotificationServices : INotificactionServices
    {
    
        public async Task SendMail(string Email, string Name,string LastName)
        {

            var config = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json", true, true)
            .Build();
            
            var baseUrl = config.GetSection("AppSettings:Azure:AppLogic:uri").Value;
            var apiVersion = config.GetSection("AppSettings:Azure:AppLogic:api-version").Value;
            var sp = config.GetSection("AppSettings:Azure:AppLogic:sp").Value;
            var sv = config.GetSection("AppSettings:Azure:AppLogic:sv").Value;
            var sig = config.GetSection("AppSettings:Azure:AppLogic:sig").Value;

            var queryParams = new Dictionary<string, string>
            {
                {"api-version", apiVersion},
                {"sp", sp},
                {"sv", sv},
                {"sig", sig}
            };

            var httpClient = new HttpClient();
            
            var queryString = new FormUrlEncodedContent(queryParams).ReadAsStringAsync().Result;

            var data = new Dictionary<string, string>
            {
                { "to", Email },
                { "subject", "Notificacion" },
                { "email_body", $"Bienvenido {Name} {LastName} " }
            };

            var jsonData = new StringContent(Newtonsoft.Json.JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");

            var url = $"{baseUrl}{queryString.Replace("52","")}";

            var response = await httpClient.PostAsync(url, jsonData);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
            }
        }
    }
}
