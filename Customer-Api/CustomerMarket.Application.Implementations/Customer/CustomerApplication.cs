
using Autofac;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Common.Configurations;
using Common.Exceptions;
using Domain.Models.Entities;
using Dto;
using Repository.Interfaces;
using Repository.Interfaces.Data;
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Interfaces.Customer;
using Service.Interfaces;

namespace Application.Implementations.Customer
{
    public class CustomerApplication : ICustomerApplication
    {
        private readonly Lazy<IUnitOfWork> _unitOfWork;
        private readonly Lazy<IHttpContextAccessor> _httpContext;
        private readonly AppSettings _settings;

        private readonly INotificactionServices _notificationServices;

        public CustomerApplication(IOptions<AppSettings> appSettings, ILifetimeScope lifetimeScope, INotificactionServices notificationServices)
        {
            _settings = appSettings.Value;
            _httpContext = new Lazy<IHttpContextAccessor>(() => lifetimeScope.Resolve<IHttpContextAccessor>());
            _unitOfWork = new Lazy<IUnitOfWork>(() => lifetimeScope.Resolve<IUnitOfWork>());
            _notificationServices = notificationServices;
        }

        private ClaimsPrincipal UserIdentity
        { get { return _httpContext.Value.HttpContext.User; } }
        private IUnitOfWork UnitOfWork => _unitOfWork.Value;
        private ICustomerRepository CustomerRepository => UnitOfWork.Repository<ICustomerRepository>();

        public async Task<ResponseDTO> List(int Pagina,int Limite)
        {
            var response = new ResponseDTO();

            response.data = await CustomerRepository.List(Pagina, Limite);
            return response;
        }

        public async Task<ResponseDTO> GetById(int Id)
        {
            var response = new ResponseDTO();

            response.data = await CustomerRepository.GetById(Id);
            return response;
        }

        public async Task<ResponseDTO> Register(string Name, string LastName, string Address, string CellPhone, string Email)
        {
            var response = new ResponseDTO();

            var customerEntity = new CustomerEntity
            {
                Name = Name,
                LastName = LastName,
                Address= Address,
                CellPhone = CellPhone,
                Email = Email,
            };

            await UnitOfWork.Set<CustomerEntity>().AddAsync(customerEntity);
            UnitOfWork.SaveChanges();

            response.data = customerEntity;

            await _notificationServices.SendMail(Email, Name, LastName);

            return response;
        }

        public async Task<ResponseDTO> Update(int Id,string Name, string LastName, string Address, string CellPhone,string Email)
        {
            var response = new ResponseDTO();

            var customerObj= await CustomerRepository.GetById(Id);

            if (customerObj == null)  throw new CustomerException(404,"Not Found"); 
         

            var customerEntity = new CustomerEntity
            {
                Id=Id,
                Name = Name,
                LastName = LastName,
                Address = Address,
                CellPhone = CellPhone,
                Email= Email
            };

            UnitOfWork.Set<CustomerEntity>().Update(customerEntity);
            UnitOfWork.SaveChanges();

            response.data = customerEntity;
            return response;
        }

        public async Task<ResponseDTO> Delete(int Id)
        {
            var response = new ResponseDTO();

            var customerObj = await CustomerRepository.GetById(Id);

            if (customerObj == null) throw new CustomerException(404, "Not Found");


            var customerEntity = new CustomerEntity
            {
                Id = Id
            };

            UnitOfWork.Set<CustomerEntity>().Remove(customerEntity);
            UnitOfWork.SaveChanges();

            response.data = "OK";
            return response;
        }

    }
}
