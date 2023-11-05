using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser, IdentityRole, string>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Event> Events { get; set; }
        public DbSet<Hackathon> Hackathons { get; set; }
        public DbSet<Grant> Grants { get; set; }
        public DbSet<Accelerator> Accelerators { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Investor> Investors { get; set; }
    }
}