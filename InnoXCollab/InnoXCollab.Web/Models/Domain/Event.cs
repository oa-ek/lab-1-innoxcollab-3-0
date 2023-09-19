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
        public string? FeaturedImageUrl { get; set; }
        public string? UrlHandle { get; set; }
        public string? HoldingPlace { get; set; }
        public virtual User? User { get; set; }
        public virtual Type? Type { get; set; }
        public virtual ICollection<Tag> Tags { get; set; }
        public virtual ICollection<Transaction> Transactions { get; set; } 
        public virtual ICollection<Investor> Investors { get; set; }
    }
}
