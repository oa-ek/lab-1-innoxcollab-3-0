using Application.Companies;

namespace Application.Profiles
{
    public class ProfileDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public string Email { get; set; }
        public string Image { get; set; }
        public CompanyDto Company { get; set; }
    }
}