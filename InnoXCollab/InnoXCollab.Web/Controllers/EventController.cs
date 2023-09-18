using InnoXCollab.Web.Models;
using InnoXCollab.Web.Models.Domain;
using InnoXCollab.Web.Models.Dto;
using InnoXCollab.Web.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Diagnostics;

namespace InnoXCollab.Web.Controllers
{
    public class EventController : Controller
    {
		private readonly IGenericRepository<Event> eventRepository;
        private readonly IGenericRepository<Tag> tagRepository;

        public EventController(IGenericRepository<Event> eventRepository, IGenericRepository<Tag> tagRepository) {
            this.eventRepository = eventRepository;
            this.tagRepository = tagRepository;
        }

		[HttpGet]
		public async Task<IActionResult> Create() 
		{
            var tags = await tagRepository.GetAllAsync();

            var model = new CreateEventRequest
            {
                Tags = tags.Select(x => new SelectListItem { Text = x.Name, Value = x.Id.ToString() })
            };
            return View(model);
		}

    }
}
