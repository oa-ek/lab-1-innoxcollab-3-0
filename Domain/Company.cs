namespace Domain;

public class Company
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Url { get; set; }
    public ICollection<AppUser> Representers { get; set; }
    public ICollection<Event> Events { get; set; }
}