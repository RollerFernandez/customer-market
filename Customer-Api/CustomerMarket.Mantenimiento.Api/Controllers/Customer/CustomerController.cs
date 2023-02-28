using Autofac;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Common;
using Common.Exceptions;
using Dto;
using System;
using System.Threading.Tasks;
using Application.Interfaces.Customer;
using Model.Customer;

namespace Api.Controllers.Customer
{
    [Route("[controller]")]
    [ApiController]
    [ApiExplorerSettings(IgnoreApi = false)]
    public class CustomerController : ControllerBase
    {
        private readonly Lazy<ICustomerApplication> _customerApplication;
        private readonly ILogger _logger;

        public CustomerController(ILifetimeScope lifetimeScope, ILogger<CustomerController> logger)
        {
            _customerApplication = new Lazy<ICustomerApplication>(() => lifetimeScope.Resolve<ICustomerApplication>());
            _logger = logger;
        }

        private ICustomerApplication CustomerApplication => _customerApplication.Value;


        [HttpGet]
        [Route("List")]
        public async Task<IActionResult> List(int Pagina, int Limite)
        {
            ResponseDTO response;

            try
            {
                response = await CustomerApplication.List(Pagina,Limite);
            }
            catch (FunctionalException ex)
            {
                response = new ResponseDTO { status = ex.Status, sucess=false, data = ex.Data, transactionId = ex.TransactionId };
                _logger.LogWarning(ex.TransactionId, ex.Message, ex);
            }
            catch (TechnicalException ex)
            {
                response = new ResponseDTO { status = ex.Status, sucess = false, data = ex.Data, transactionId = ex.TransactionId };
               _logger.LogError(ex.TransactionId, ex.Message, ex);
            }
            catch (Exception ex)
            {
                response = new ResponseDTO { status = Constants.Common.EstadoRespuesta.ERROR_TECNICO, sucess = false };
                _logger.LogError(response.transactionId, ex.Message, ex);
            }
            return Ok(response);
        }

        [HttpGet]
        [Route("GetById/{Id}")]
        public async Task<IActionResult> GetById(int Id)
        {
            ResponseDTO response;

            try
            {
                response = await CustomerApplication.GetById(Id);
            }
            catch (FunctionalException ex)
            {
                response = new ResponseDTO { status = ex.Status, sucess = false, data = ex.Data, transactionId = ex.TransactionId };
                _logger.LogWarning(ex.TransactionId, ex.Message, ex);
            }
            catch (TechnicalException ex)
            {
                response = new ResponseDTO { status = ex.Status, sucess = false, data = ex.Data, transactionId = ex.TransactionId };
                _logger.LogError(ex.TransactionId, ex.Message, ex);
            }
            catch (Exception ex)
            {
                response = new ResponseDTO { status = Constants.Common.EstadoRespuesta.ERROR_TECNICO, sucess = false };
                _logger.LogError(response.transactionId, ex.Message, ex);
            }
            return Ok(response);
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(RegisterCustomerModel model)
        {
            ResponseDTO response;

            try
            {
                response = await CustomerApplication.Register(model.Name, model.LastName, model.Address, model.CellPhone, model.Email);
            }
            catch (FunctionalException ex)
            {
                response = new ResponseDTO { status = ex.Status, sucess = false, data = ex.Data, transactionId = ex.TransactionId };
                _logger.LogWarning(ex.TransactionId, ex.Message, ex);
            }
            catch (TechnicalException ex)
            {
                response = new ResponseDTO { status = ex.Status, sucess = false, data = ex.Data, transactionId = ex.TransactionId };
                _logger.LogError(ex.TransactionId, ex.Message, ex);
            }
            catch (Exception ex)
            {
                response = new ResponseDTO { status = Constants.Common.EstadoRespuesta.ERROR_TECNICO, sucess = false };
                _logger.LogError(response.transactionId, ex.Message, ex);
            }
            return Ok(response);
        }

        [HttpPut]
        [Route("Update")]
        public  async Task<IActionResult>  Update(UpdateCustomerModel model)
        {
            ResponseDTO response;

            try
            {
                response =await  CustomerApplication.Update(model.Id, model.Name, model.LastName, model.Address, model.CellPhone,model.Email);
            }
            catch (FunctionalException ex)
            {
                response = new ResponseDTO { status = ex.Status, sucess = false, data = ex.Data, transactionId = ex.TransactionId };
                _logger.LogWarning(ex.TransactionId, ex.Message, ex);
            }
            catch (TechnicalException ex)
            {
                response = new ResponseDTO { status = ex.Status, sucess = false, data = ex.Data, transactionId = ex.TransactionId };
                _logger.LogError(ex.TransactionId, ex.Message, ex);
            }
            catch (Exception ex)
            {
                response = new ResponseDTO { status = Constants.Common.EstadoRespuesta.ERROR_TECNICO, sucess = false };
                _logger.LogError(response.transactionId, ex.Message, ex);
            }
            return Ok(response);
        }


        [HttpDelete]
        [Route("Delete")]
        public async Task<IActionResult> Delete(DeleteCustomerModel model)
        {
            ResponseDTO response;

            try
            {
                response = await CustomerApplication.Delete(model.Id);
            }
            catch (FunctionalException ex)
            {
                response = new ResponseDTO { status = ex.Status, sucess = false, data = ex.Data, transactionId = ex.TransactionId };
                _logger.LogWarning(ex.TransactionId, ex.Message, ex);
            }
            catch (TechnicalException ex)
            {
                response = new ResponseDTO { status = ex.Status, sucess = false, data = ex.Data, transactionId = ex.TransactionId };
                _logger.LogError(ex.TransactionId, ex.Message, ex);
            }
            catch (Exception ex)
            {
                response = new ResponseDTO { status = Constants.Common.EstadoRespuesta.ERROR_TECNICO, sucess = false };
                _logger.LogError(response.transactionId, ex.Message, ex);
            }
            return Ok(response);
        }
    }
}
