using InnoXCollab.Web.Models.Domain;

namespace InnoXCollab.Web.Models.Dto
{
	public class EditTagRequest
	{
		public Guid Id { get; set; }
		public string Name { get; set; }

		public ICollection<Event> Events { get; set; }
	}
}
