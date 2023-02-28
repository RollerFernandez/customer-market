
namespace Common.Configurations.Base
{
    public class ServiceConfiguration
    {
        public string Url { get; set; }
        public CredentialConfiguration Credentials { get; set; }
    }

    public partial class Portal
    {
        public string Url { get; set; }
    }

    public partial class CredentialConfiguration
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public partial class SMTPConfiguration
    {
        public string FromEmail { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
        public CredentialConfiguration Credentials { get; set; }
    }

    public partial class GoogleCloudStorage
    {
        public string Path { get; set; }
    }

    public partial class Storage
    {
        public string ProjectURL { get; set; }
        public string Bucket { get; set; }
        public GoogleCloudStorage Familias { get; set; }
        public GoogleCloudStorage Averias { get; set; }
        public GoogleCloudStorage EntidadFinanciera { get; set; }
        public GoogleCloudStorage SolicitudCredito { get; set; }
        public GoogleCloudStorage Entrenamiento { get; set; }
        public GoogleCloudStorage Banner { get; set; }
    }

    public partial class Services
    {
        public ServiceConfiguration ISAM { get; set; }
        public ServiceConfiguration SAFAdminSEGWSUsuario { get; set; }
        public ServiceConfiguration SAFAdminSEGWSMenu { get; set; }
        public ServiceConfiguration BusinessPartner { get; set; }
        public ServiceConfiguration CustomerOrders { get; set; }
        public SMTPConfiguration SMTP { get; set; }
        public ServiceConfiguration EstadoCuenta { get; set; }
        public ServiceConfiguration Paperless { get; set; }
        public ServiceConfiguration EstadoMensual { get; set; }
        public ServiceConfiguration Ferreyros { get; set; }
    }
}
