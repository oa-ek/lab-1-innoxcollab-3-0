using InnoXCollab.Web.Models.Domain.Interfaces;
using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InnoXCollab.Web.Models.Domain
{
    public class User : IEntity<Guid>
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public virtual ICollection<Event> Events { get; set; }
        public virtual ICollection<AdminLog> AdminLogs { get; set; }
    }
}
