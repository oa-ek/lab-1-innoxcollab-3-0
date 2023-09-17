using System.ComponentModel.DataAnnotations;
using InnoXCollab.Web.Models.Domain.Interfaces;

namespace InnoXCollab.Web.Models.Domain
{
    public class Investor : IEntity<Guid>
    {
        [Key]
        public Guid Id { get; set; }

        public string InvestorName { get; set; }

        public string? InvestorEmail { get; set; }

        public decimal InvestorAmount { get; set; }

        public virtual ICollection<Event> Events { get; set; }
    }
}
