using Dto.Common;
using Dto.Customer;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
   public interface ICustomerRepository
    {
        Task<PaginacionDTO<CustomerDTO>> List(int pagina, int limite);
        Task<CustomerDTO> GetById(int  Id);
        
    }
}
