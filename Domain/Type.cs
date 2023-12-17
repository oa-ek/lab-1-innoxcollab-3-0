namespace Domain;

public class Type
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public ICollection<Event> Events { get; set; }
}