using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using InnoXCollab.Web.Models.Domain.Interfaces;

namespace InnoXCollab.Web.Models.Domain
{
    public class AdminLog : IEntity<Guid>
    {
        [Key]
        public Guid Id { get; set; }
        
        public DateTime LogDateTime { get; set; }
        public string Action { get; set; }


        public Guid UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}
