using Application.Core;

namespace Application.Events.Helpers
{
    public class EventParams : PagingParams
    {
        public int Status { get; set; } = -1;
        public string SearchTerm { get; set; }
        public string EventType { get; set; }
        public string TagName { get; set; }
    }
}