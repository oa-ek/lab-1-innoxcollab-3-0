using System.ComponentModel.DataAnnotations;
using InnoXCollab.Web.Models.Domain.Interfaces;

namespace InnoXCollab.Web.Models.Domain
{
    public class Investor : IEntity<Guid>
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? Email { get; set; }
        public decimal InvestmentAmount { get; set; }
        public virtual ICollection<Event> Events { get; set; }
    }
}
