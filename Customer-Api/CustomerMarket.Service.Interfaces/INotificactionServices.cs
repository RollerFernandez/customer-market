using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface INotificactionServices
    {
        Task SendMail(string Email, string Name, string LastName);
    }
}
