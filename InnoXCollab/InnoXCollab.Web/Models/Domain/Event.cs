using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace InnoXCollab.Web.Models.Domain
{
    public class Event
    {
        [Key]
        public int EventID { get; set; }
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public DateTime HoldingTime { get; set; }
        public string HoldingPlace { get; set; }

        public int UserID { get; set; }

        [ForeignKey("UserID")]
        public virtual User User { get; set; }

        //public virtual ICollection<EventTag> EventTags { get; set; }
    }
}
