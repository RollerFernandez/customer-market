
namespace Common
{
    public static class Constants
    {
        public struct Core
        {
            public struct AccessLevel
            {
                public const string INTERNO = "Interno";
                public const string EXTERNO = "Externo";
            }

            public struct Audit
            {
                public const string CREATION_USER = "CreationUser";
                public const string CREATION_DATE = "CreationDate";
                public const string MODIFICATION_USER = "ModificationUser";
                public const string MODIFICATION_DATE = "ModificationDate";
                public const string ROW_STATUS = "RowStatus";
                public const string SYSTEM = "System";
            }


            public struct UserClaims
            {
                public const string UserId = "UserId";
                public const string UserName = "UserName";
                public const string Role = "Role";
                public const string FullName = "FullName";
                public const string Society = "Sociedad";
                public const string ServiceOrganization = "ServiceOrganization";
            }

            public struct UserStatus
            {
                public const string ACTIVO = "ECEA";
            }

            public struct DateTimeFormats
            {
                public const string DD_MM_YYYY_HH_MM_SS_FFF = "yyyyMMddHHmmssFFF";
            }

            public static class Token
            {
                public const string TOKEN_ESTADOS = "TETK";
                public const string TOKEN_MOTIVOS = "TMTK";

                public const string CURRENT_USER = "CurrentUser";
                public const string ACCESS_LEVEL = "AccessLevel";
                public const string ROLES_INTERNO = "RolesInterno";

            }
        }
        
        public static class MonthDescription
        {
            public static string GetMonthDescription(string numberMonth)
            {
                switch (numberMonth)
                {
                    case "01":
                        return "Enero";

                    case "02":
                        return "Febrero";

                    case "03":
                        return "Marzo";

                    case "04":
                        return "Abril";

                    case "05":
                        return "Mayo";

                    case "06":
                        return "Junio";

                    case "07":
                        return "Julio";

                    case "08":
                        return "Agosto";

                    case "09":
                        return "Septiembre";

                    case "10":
                        return "Octubre";

                    case "11":
                        return "Noviembre";

                    case "12":
                        return "Diciembre";

                    default:
                        return "NO RELEVANTE";
                }
            }
        }

        public struct Common
        {

            public struct Mensaje
            {


                public struct Seguridad
                {
                    public const string UserInactive = "No se encontró entrada";
                    public const string ContrasenTamanioMinimo = "HPDAA0284E";
                    public const string ContrasenCaracteresEspeciales = "HPDAA0285E";
                }

            }

            public struct EstadoRespuesta
            {
                public const int ERROR_FUNCIONAL = 1;
                public const int OK = 200;
                public const int ERROR_TECNICO = -1;
            }

            public struct RegexValidation
            {
                public const string ContrasenaFuerte = "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[.,?!@+*\\-_\\$])[A-Za-z0-9.,?!@+*\\-_\\$]+$";
                public const string SoloNumeros = @"^[0-9]*$";
                public const string SoloLetras = @"^[a-zA-Z\u00C0-\u00FF ]*$";
                public const string SoloLetrasRazonSocial = @"^[a-zA-Z\u00C0-\u00FF.\\-_ ]*$";
            }
        }
       
    }
}
