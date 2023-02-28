

namespace Common.Configurations
{
    public class AppSettings
    {
        public DatabaseConfiguration DatabaseConfiguration { get; set; }
        public JwTokenConfiguration JWTokenConfiguration { get; set; }
        public PermissionConfiguration PermissionConfiguration { get; set; }
        public CustomerConfiguration CustomerConfiguration { get; set; }
        public CacheConfiguration CacheConfiguration { get; set; }
    }
}
