using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public Investor Investor { get; set; }
        public ICollection<Event> Events { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}
