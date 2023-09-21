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
            IGenericRepository<Models.Domain.Type> typeRepository)
        {
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
            };

            var investor = new Investor
            {
                Name = createEventRequest.Investor,
                InvestmentAmount = createEventRequest.StartPrice
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
            @event.Investor = investor;

            var selectedTypeId = Guid.Parse(createEventRequest.SelectedType);
            var existingType = await typeRepository.GetAsync(selectedTypeId);
            @event.Type = existingType;

            await eventRepository.AddAsync(@event);

            return RedirectToAction("Create");
        }


        [HttpGet]
        public async Task<IActionResult> List()
        {
            var events = await eventRepository.IncludeAsync(x => x.Tags);
            return View(events.ToList());
        }

        [HttpGet]
        public async Task<IActionResult> Edit(Guid id)
        {
            var @event = await eventRepository.GetAsync(id, x => x.Tags, x => x.Investor);

            var tagsDomainModel = await tagRepository.GetAllAsync();

            var typesDomainModel = await typeRepository.GetAllAsync();

            if (@event != null)
            {
                var model = new EditEventRequest
                {
                    Id = @event.Id,
                    Name = @event.Name,
                    Description = @event.Description,
                    HoldingTime = @event.HoldingTime,
                    Tags = tagsDomainModel.Select(x => new SelectListItem
                    {
                        Text = x.Name,
                        Value = x.Id.ToString()
                    }),
                    SelectedTags = @event.Tags.Select(x => x.Id.ToString()).ToArray(),
                    Types = typesDomainModel.Select(x => new SelectListItem { Text = x.Name, Value = x.Id.ToString() }),
                    SelectedType = @event.Type.Id.ToString(),

                    Investor = @event.Investor

                };
                return View(model);
            }

            return View(null);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(EditEventRequest editEventRequest)
        {

            var @event = new Event
            {
                Id = editEventRequest.Id,
                Name = editEventRequest.Name,
                Description = editEventRequest.Description,
                ShortDescription = null,
                HoldingTime = editEventRequest.HoldingTime,
                HoldingPlace = null,
                FeaturedImageUrl = null,
                UrlHandle = null,
                User = null,
                Investor = editEventRequest.Investor// temporary decisions here

            };

            var selectedTags = new List<Tag>();

            foreach (string selectedTagId in editEventRequest.SelectedTags) 
            { 
                var selectedTagGuidId = Guid.Parse(selectedTagId);

                var existingTag = await tagRepository.GetAsync(selectedTagGuidId);

                if(existingTag != null)
                {
                    selectedTags.Add(existingTag);
                }
            }

            @event.Tags = selectedTags;

            var selectedType = await typeRepository.GetAsync(Guid.Parse(editEventRequest.SelectedType));

            @event.Type = selectedType;

            var updatedEvent = await eventRepository.UpdateAsync(@event);
            if (updatedEvent != null)
            {
                return RedirectToAction("List");
            }
            return RedirectToAction("Edit", new { id = editEventRequest.Id });
        }

        [HttpPost]
        public async Task<IActionResult> Delete(EditEventRequest editEventRequest)
        {
            var deletedEvent = await eventRepository.DeleteAsync(editEventRequest.Id);
            if (deletedEvent != null)
            {
                return RedirectToAction("List");
            }

           
            return RedirectToAction("List");

            return RedirectToAction("Edit", new { id = editEventRequest.Id });
        }
    }
}
