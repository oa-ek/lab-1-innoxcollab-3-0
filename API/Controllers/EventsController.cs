using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Infrastructure.MediatoR.Events;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EventsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Event>>> GetEvents()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Event>> GetEvent(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult> CreateEvent(/*[FromBody]*/Event _event)
        {
            await Mediator.Send(new Create.Command{@event = _event});
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditEvent(Guid id, /*[FromBody]*/Event _event)
        {
            _event.Id = id;
            await Mediator.Send(new Edit.Command{@event = _event});
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> CreateEvent(Guid id)
        {
            await Mediator.Send(new Delete.Command{Id = id});
            return Ok();
        }
    }
}