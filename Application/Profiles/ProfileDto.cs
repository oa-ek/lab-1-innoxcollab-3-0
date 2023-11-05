using Domain;

namespace Application.Profiles
{
    public class ProfileDto
    {
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public string Image { get; set; }
        public ICollection<string> Role { get; set; }
        public Investor Investor { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}