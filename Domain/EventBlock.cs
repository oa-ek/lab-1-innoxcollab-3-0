namespace Domain
{
    public class EventBlock
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string AttachedFileUrl { get; set; }
        public Guid EventId { get; set; }
        public Event Event { get; set; }
    }
}