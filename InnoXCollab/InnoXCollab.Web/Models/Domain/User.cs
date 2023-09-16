using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InnoXCollab.Web.Models.Domain
{
    public class User
    {
        [Key]
        public Guid UserId { get; set; }

        public string UserName { get; set; }

        public string UserRole { get; set; }

        public string UserEmail { get; set; }

        public string Password { get; set; }

        public virtual ICollection<Event> Events { get; set; }
        public virtual ICollection<AdminLog> AdminLogs { get; set; }
    }
}
