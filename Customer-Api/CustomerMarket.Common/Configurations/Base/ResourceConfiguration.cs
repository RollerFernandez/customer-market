

namespace Common.Configurations.Base
{
    public class ResourceConfiguration
    {
        public Logging Logging { get; set; }
    }

    public partial class Logging
    {
        public GoogleStackdriver GoogleStackdriver { get; set; }
    }

    public partial class GoogleStackdriver
    {
        public string ProjectId { get; set; }
        public string ServiceName { get; set; }
        public string Version { get; set; }
        public LogLevel LogLevel { get; set; }
    }

    public partial class LogLevel
    {
        public string Default { get; set; }
        public string Microsoft { get; set; }
        public string MicrosoftHostingLifetime { get; set; }
    }
}
