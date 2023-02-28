
using Microsoft.EntityFrameworkCore;
using Domain.Models.Entities;
using Dto.Common;
using Repository.Implementations.Data;
using Repository.Implementations.Data.Base;
using Repository.Interfaces;
using Nest;
using System;
using System.Linq;
using System.Threading.Tasks;
using Dto.Customer;
using Microsoft.Data.SqlClient;

namespace Repository.Implementations
{
   public class CustomerRepository : BaseRepository<CustomerEntity>, ICustomerRepository
    {
        private readonly DataContext context;

        public CustomerRepository(DataContext context) : base(context)
        {
            this.context = context;
        }

        public async Task<PaginacionDTO<CustomerDTO>> List(int pagina,int limite)
        {
                var query = context.Customer.AsQueryable();

                var total = await query.CountAsync();

                var result = await query.OrderBy(x => x.Id).Select(x => new CustomerDTO()
                {
                    Id = x.Id,
                    Name = x.Name,
                    LastName = x.LastName,
                    Address = x.Address,
                    CellPhone = x.CellPhone,
                    Email=x.Email
                }).Skip(limite * (pagina - 1)).Take(limite).ToListAsync();


                return new PaginacionDTO<CustomerDTO>
                {
                    items = result,
                    pages = Convert.ToInt32(Math.Ceiling(total / (limite * 1d))),
                    total = total
                };

        }

        public async Task<CustomerDTO> GetById(int Id)
        {
            var query = context.Customer.AsQueryable().Where(x => x.Id==Id);

            return await query.Select(x => new CustomerDTO()
            {
                Id = x.Id,
                Name = x.Name,
                LastName = x.LastName,
                Address = x.Address,
                CellPhone = x.CellPhone,
                Email=x.Email
            }).FirstOrDefaultAsync();
        }

    }
}
