using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Type = Domain.Type;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Event> Events { get; set; }
        public DbSet<Type> Types { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<EventBlock> EventBlocks { get; set; }
        public DbSet<Company> Companies { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Event>()
                .HasOne(e => e.AppUser)
                .WithMany(u => u.Events)
                .HasForeignKey(e => e.AppUserId);

            builder.Entity<AppUser>()
                .HasMany(u => u.Events)
                .WithOne(e => e.AppUser)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Type>()
                .HasMany(u => u.Events)
                .WithOne(e => e.Type)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(builder);
        }
    }
}