using Common.Configurations.Base;


namespace Common.Configurations
{
    public class JwTokenConfiguration
    {
        public string Secret { get; set; }
        public long ExpirationTimeHours { get; set; }
        public string Iss { get; set; }
        public string Aud { get; set; }
        public CredentialConfiguration Credentials { get; set; }
    }
}
