using Application.Events;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EventsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetEvents()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetEvent(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<ActionResult> CreateEvent([FromBody] Event @event)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Event = @event }));
        }

        [Authorize(Policy = "IsEventHost")]
        [HttpPut("{id}")]
        public async Task<ActionResult> EditEvent(Guid id, [FromBody] Event @event)
        {
            @event.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Event = @event }));
        }

        [Authorize(Policy = "IsEventHost")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEvent(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        [Authorize(Policy = "IsEventHost")]
        [HttpPost("{id}/cancel")]
        public async Task<ActionResult> CancelEvent(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateIsCanceled.Command { Id = id }));
        }

        [Authorize(Policy = "IsEventHost")]
        [HttpPost("{id}/addBlock")]
        public async Task<ActionResult> AddBlock(Guid id, [FromBody] EventBlock eventBlock)
        {
            return HandleResult(await Mediator.Send(new AddBlock.Command { Id = id, EventBlock = eventBlock }));
        }
        
        [HttpGet("search")]
        public async Task<ActionResult> Search(string searchTerm)
        {
            return HandleResult(await Mediator.Send(new Search.Query { SearchTerm = searchTerm }));
        }
    }
}