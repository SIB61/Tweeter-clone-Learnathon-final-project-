using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace core.Entities.ServiceEntities
{
    public class DatabaseSettings
    {
        public string ConnectionString {get; set;} = null!;
        public string DatabaseName {get; set;} = null!;
    }
}