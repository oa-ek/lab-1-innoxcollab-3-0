using InnoXCollab.Web.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace InnoXCollab.Web.Data
{
    public class InnoXCollabContext : DbContext
    {
        public InnoXCollabContext(DbContextOptions options) : base(options)
        {
            // Explicitly initialize
            Users = Set<User>();

            AdminLogs = Set<AdminLog>();

            Events = Set<Event>();

            EventTypes = Set<EventType>();

            EventTags = Set<EventTag>();

            Investors = Set<Investor>();

            Transactions = Set<Transaction>();
        }
        /*
         *  We could initialize like this 
         *  public DbSet<User> Users { get; set; } = new DbSet<User>();
         *  but Entity Framework Core can do it by itself (implicitly initialize)
         */
        public DbSet<User> Users { get; set; }

        public DbSet<AdminLog> AdminLogs { get; set; }

        public DbSet<Event> Events { get; set; }

        public DbSet<EventType> EventTypes { get; set; }

        public DbSet<EventTag> EventTags { get; set; }

        public DbSet<Investor> Investors { get; set; }

        public DbSet<Transaction> Transactions { get; set; }
    }
}
