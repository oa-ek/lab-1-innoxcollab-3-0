namespace Application.Events
{
    public class EventBlockDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string AttachedFileUrl { get; set; }
    }
}