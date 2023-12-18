using Application.Core;

namespace Application.Events.Helpers
{
    public class EventParams : PagingParams
    {
        public List<int> Statuses { get; set; }
        public string SearchTerm { get; set; }
        public List<string> EventTypes { get; set; }
        public string TagName { get; set; }
    }
}