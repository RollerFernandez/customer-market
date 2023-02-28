using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Interfaces.Configurations.Base;

namespace Repository.Implementations.Configurations.Base
{
    public abstract class EntityConfiguration<T> : IEntityConfiguration<T> where T : class
    {
        public void Configure(EntityTypeBuilder<T> builder)
        {
            //builder.Property("Id").HasColumnName("IN_ID").UseIdentityColumn();
            //builder.Property("CreationUser").HasColumnName("VC_USUARIO_CREACION");
            //builder.Property("CreationDate").HasColumnName("DT_FECHA_CREACION");
            //builder.Property("ModificationUser").HasColumnName("VC_USUARIO_MODIFICACION");
            //builder.Property("ModificationDate").HasColumnName("DT_FECHA_MODIFICACION");
            //builder.Property("RowStatus").HasColumnName("BT_ESTADO_FILA");
        }
    }
}
