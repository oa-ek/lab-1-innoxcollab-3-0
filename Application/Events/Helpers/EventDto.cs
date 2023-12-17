using Application.Companies;
using Application.Profiles;
using Application.Tags;
using Application.Types;

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
        public int Status { get; set; }
        public string RelatedPhoto { get; set; }
        public TypeDto Type { get; set; }
        public double FundingAmount { get; set; }
        public ICollection<TagDto> Tags { get; set; }
        public ICollection<EventBlockDto> Blocks { get; set; }
        public ProfileDto CreatorProfile { get; set; }
    }
}