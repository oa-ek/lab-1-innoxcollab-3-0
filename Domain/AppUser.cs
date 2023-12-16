using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public Photo Photo { get; set; }
        public ICollection<Event> Events { get; set; }
        public Company Company { get; set; }
    }
}