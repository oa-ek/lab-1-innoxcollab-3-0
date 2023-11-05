namespace Domain
{
    public class Investor
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string WebsiteUrl { get; set; }
        public ICollection<AppUser> Representers { get; set; }
    }
}