using InnoXCollab.Web.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace InnoXCollab.Web.Data
{
    public class InnoXCollabContext : DbContext
    {
        public InnoXCollabContext(DbContextOptions options) : base(options)
        {
            // ALLAH PRAYGE
        }
        public DbSet<User> Users { get; set; }
        public DbSet<AdminLog> AdminLogs { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Models.Domain.Type> Types { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Investor> Investors { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
    }
}
