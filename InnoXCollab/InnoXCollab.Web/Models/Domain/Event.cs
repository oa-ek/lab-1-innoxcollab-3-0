using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using InnoXCollab.Web.Models.Domain.Interfaces;

namespace InnoXCollab.Web.Models.Domain
{
    public class Event : IEntity<Guid>
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? ShortDescription { get; set; }
        public string Description { get; set; }
        public DateTime HoldingTime { get; set; }
        public string HoldingPlace { get; set; }

        [ForeignKey("UserId")]
        public Guid UserId { get; set; }
        public virtual User User { get; set; }

        [ForeignKey("EventTypeId")]
        public Guid EventTypeId { get; set; }
        public virtual EventType EventType { get; set; }

        public virtual ICollection<EventTag> EventTags { get; set; }

        public virtual ICollection<Transaction> Transactions { get; set; }

        public virtual ICollection<Investor> Investors { get; set; }
    }
}
