using Domain.Enums;

namespace Domain
{
    public class Event
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public string Venue { get; set; }
        public bool IsCanceled { get; set; }
        public string RelatedPhoto { get; set; }
        public double FundingAmount { get; set; }
        public Type Type { get; set; }
        public EventStatus Status { get; set; }
        public ICollection<Tag> Tags { get; set; }
        public ICollection<EventBlock> Blocks { get; set; } = new List<EventBlock>();
        public AppUser AppUser { get; set; }
        public string AppUserId { get; set; }
    }
}