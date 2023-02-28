using Dto;
using System.Threading.Tasks;

namespace Application.Interfaces.Customer
{
    public interface ICustomerApplication
    {
        Task<ResponseDTO> List(int Pagina,int Limite);
        Task<ResponseDTO> GetById(int Id);
        Task<ResponseDTO> Register(string Name, string LastName, string Address, string CellPhone,string Email);
        Task<ResponseDTO> Update(int Id, string Name, string LastName, string Address, string CellPhone, string Email);
        Task<ResponseDTO> Delete(int Id);
    }
}
