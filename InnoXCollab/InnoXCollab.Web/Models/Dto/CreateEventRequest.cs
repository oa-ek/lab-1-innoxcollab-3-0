using InnoXCollab.Web.Models.Domain;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace InnoXCollab.Web.Models.Dto
{
    public class CreateEventRequest
    {
        public string Name { get; set; }
        
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public DateTime HoldingTime { get; set; } = DateTime.Now;
        public string HoldingPlace { get; set; } = string.Empty;
        public string UrlHandle { get; set; } = string.Empty;
        public decimal StartPrice { get; set; }

		// Display types
		public IEnumerable<SelectListItem> Types { get; set; }
        public string SelectedType { get; set; }

		// Display Tags
		public IEnumerable<SelectListItem> Tags { get; set; }
        public string[] SelectedTags { get; set; } = Array.Empty<string>();

        // Investor
        public string? Investor { get; set; }

        public string? ImageUrl { get; set; }
    }
}
