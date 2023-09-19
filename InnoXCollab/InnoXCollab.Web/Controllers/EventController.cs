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
		private readonly IGenericRepository<Models.Domain.Type> typeRepository;

		public EventController(IGenericRepository<Event> eventRepository,
            IGenericRepository<Tag> tagRepository,
            IGenericRepository<Models.Domain.Type> typeRepository) {
            this.eventRepository = eventRepository;
            this.tagRepository = tagRepository;
			this.typeRepository = typeRepository;
		}

		[HttpGet]
		public async Task<IActionResult> Create() 
		{
            var tags = await tagRepository.GetAllAsync();
            var types = await typeRepository.GetAllAsync();

            var model = new CreateEventRequest
            {
                Tags = tags.Select(x => new SelectListItem { Text = x.Name, Value = x.Id.ToString() }),
                Types = types.Select(x => new SelectListItem { Text = x.Name, Value = x.Id.ToString() })
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
            };

			var investors = new List<Investor>
			{
				new Investor
				{
					Name = createEventRequest.Investor,
					InvestmentAmount = createEventRequest.StartPrice
				}
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
            @event.Investors = investors;
            await eventRepository.AddAsync(@event);

            return RedirectToAction("Create");
        }


        [HttpGet]
        public async Task<IActionResult> List()
        {
            var events = await eventRepository.IncludeAsync(x => x.Tags,
                x => x.Transactions, x => x.Investors);
            return View(events);
        }

	}
}
