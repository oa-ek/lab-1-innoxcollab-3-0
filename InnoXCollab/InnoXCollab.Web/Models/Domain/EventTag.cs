using System.ComponentModel.DataAnnotations;
using InnoXCollab.Web.Models.Domain.Interfaces;

namespace InnoXCollab.Web.Models.Domain
{
    public class EventTag : IEntity<Guid>
    {
        [Key]
        public Guid Id { get; set; }

        public string EventTagName { get; set; }

        public virtual ICollection<Event> Events { get; set; }
    }
}
