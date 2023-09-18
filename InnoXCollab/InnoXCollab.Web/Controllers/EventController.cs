﻿using InnoXCollab.Web.Models;
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

        [HttpPost]

        public async Task<IActionResult> Create(CreateEventRequest createEventRequest)
        {
            var @event = new Event
            {
                Name = createEventRequest.Name,
                Description = createEventRequest.Description,
                HoldingTime = createEventRequest.HoldingTime
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

            return View();
        }

    }
}
