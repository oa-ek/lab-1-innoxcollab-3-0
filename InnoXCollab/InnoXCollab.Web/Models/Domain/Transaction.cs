using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using InnoXCollab.Web.Models.Domain.Interfaces;

namespace InnoXCollab.Web.Models.Domain
{
    public class Transaction : IEntity<Guid>
    {
        [Key]
        public Guid Id { get; set; }
        public decimal TransactionAmount { get; set; }

        public DateTime TransactionDate { get; set; }

        public Guid InvestorId { get; set; }

        [ForeignKey(nameof(InvestorId))]

        public virtual Investor Investor { get; set; }
        
        public virtual ICollection<Event> Events { get; set; }


    }
}
