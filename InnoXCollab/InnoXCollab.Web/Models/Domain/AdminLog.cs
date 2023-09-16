using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace InnoXCollab.Web.Models.Domain
{
    public class AdminLog
    {
        [Key]
        public int LogID { get; set; }
        public int UserID { get; set; }
        public DateTime LogDateTime { get; set; }
        public string Action { get; set; }

        [ForeignKey("UserID")]
        public virtual User User { get; set; }
    }
}
