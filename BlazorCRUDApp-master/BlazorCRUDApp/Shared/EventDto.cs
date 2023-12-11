using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlazorCRUDApp.Shared
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
        public string EventType { get; set; }
        public ICollection<TagDto> Tags { get; set; }
        public ICollection<EventBlockDto> Blocks { get; set; }
        public ProfileDto CreatorProfile { get; set; }
    }   
}
