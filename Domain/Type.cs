namespace Domain;

public class Type
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public IEnumerable<Event> Events { get; set; }
}