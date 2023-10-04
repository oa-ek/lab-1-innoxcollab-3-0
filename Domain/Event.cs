using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Event : IEntity<Guid>
    {
        [Key]
        public Guid Id {get; set;}
        public string Title { get; set; }
        public DateTime Date {get; set; }
        public string Description {get; set;}
    }
}