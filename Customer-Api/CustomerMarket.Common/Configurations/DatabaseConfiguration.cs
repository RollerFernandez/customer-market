

namespace Common.Configurations
{
    public class DatabaseConfiguration
    {
        public SqlServer SqlServer { get; set; }
    }

    public partial class SqlServer
    {
        public ConnectionStrings ConnectionStrings { get; set; }
    }

    public partial class ConnectionStrings
    {
        public string DefaultConnection { get; set; }
    }
}
