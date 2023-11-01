using Domain;

namespace Application.MediatoR.Events
{
    public class EventDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public string Venue { get; set; }
        public bool IsCanceled { get; set; }
        public ICollection<Tag> Tags { get; set; }
    }
}