using InnoXCollab.Web.Data;
using InnoXCollab.Web.Models;
using InnoXCollab.Web.Models.Domain;
using InnoXCollab.Web.Models.Domain.Interfaces;
using InnoXCollab.Web.Models.Dto;
using InnoXCollab.Web.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.IdentityModel.Tokens;
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

        [HttpPost]

        public async Task<IActionResult> Create(CreateEventRequest createEventRequest)
        {
            var @event = new Event
            {
                Name = createEventRequest.Name,
                Description = createEventRequest.Description,
                ShortDescription = createEventRequest.ShortDescription,
                HoldingTime = createEventRequest.HoldingTime,
                HoldingPlace = createEventRequest.HoldingPlace,
                FeaturedImageUrl = createEventRequest.FeaturedImageUrl,
                UrlHandle = createEventRequest.UrlHandle,
                User = null, // temporary decisions here
                Type = null,
                Transactions = new List<Transaction>(),
                Investors = new List<Investor>()
            };

            var selectedTags = new List<Tag>();

            foreach (var selectedTagId in createEventRequest.SelectedTags)
            {
                var selectedTagIdAsGuid = Guid.Parse(selectedTagId);
                var existingTag = await tagRepository.GetAsync(selectedTagIdAsGuid);

                if (existingTag != null)
                {
                    selectedTags.Add(existingTag);
                }
            }

            @event.Tags = selectedTags;

            await eventRepository.AddAsync(@event);

            return RedirectToAction("Create");
        }


        [HttpGet]
        public async Task<IActionResult> List()
        {
            var events = await eventRepository.IncludeAsync(x => x.Tags);
            return View(events);
        }

	}
}
