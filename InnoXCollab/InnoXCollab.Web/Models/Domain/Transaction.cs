using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using InnoXCollab.Web.Models.Domain.Interfaces;

namespace InnoXCollab.Web.Models.Domain
{
    public class Transaction : IEntity<Guid> // FOR FUTURE PURPOSES
    {
        [Key]
        public Guid Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public virtual Investor Investor { get; set; }
        public virtual ICollection<Event> Events { get; set; }
    }
}
