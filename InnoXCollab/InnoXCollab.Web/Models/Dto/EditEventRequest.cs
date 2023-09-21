using InnoXCollab.Web.Models.Domain;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace InnoXCollab.Web.Models.Dto
{
	public class EditEventRequest
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		//public string? ShortDescription { get; set; }
		public string Description { get; set; }
		public DateTime HoldingTime { get; set; }
		//public string? FeaturedImageUrl { get; set; }
		//public string? UrlHandle { get; set; }
		//public string? HoldingPlace { get; set; }
		//public User? User { get; set; }
		//public Models.Domain.Type Type { get; set; }

		//public Investor Investor { get; set; }

		public IEnumerable<SelectListItem> Tags { get; set; }

		public string[] SelectedTags { get; set; } = Array.Empty<string>();

		public IEnumerable<SelectListItem> Types { get; set; }

		public string SelectedType { get; set; }

		public Investor Investor { get; set; }

        public string? ImageUrl { get; set; }
    }
}
