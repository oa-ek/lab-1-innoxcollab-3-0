using Application.Profiles;
using Application.Tags;

namespace Application.Events
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
        public ICollection<TagDto> Tags { get; set; }
        public ProfileDto CreatorProfile { get; set; }
    }
}