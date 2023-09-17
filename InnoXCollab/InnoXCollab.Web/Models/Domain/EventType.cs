using System.ComponentModel.DataAnnotations;
using InnoXCollab.Web.Models.Domain.Interfaces;

namespace InnoXCollab.Web.Models.Domain
{
    public class EventType : IEntity<Guid>
    {
        [Key]
        public Guid Id { get; set; }

        public string EventTypeName { get; set; }

        public virtual ICollection<Event> Events { get; set; }
    }
}
