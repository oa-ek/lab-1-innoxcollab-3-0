using Application.Events;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class HackathonsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetHackathons()
        {
            return HandleResult(await Mediator.Send(new Application.Hackathons.List.Query()));
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetHackathon(Guid id)
        {
            return HandleResult(await Mediator.Send(new Application.Hackathons.Details.Query { Id = id }));
        }
        [HttpPost]
        public async Task<IActionResult> CreateHackathon([FromBody] Hackathon hackathon)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Event = hackathon }));
        }

        [Authorize(Policy = "IsEventHost")]
        [HttpPut("{id}")]
        public async Task<ActionResult> EditHackathon(Guid id, [FromBody] Hackathon hackathon)
        {
            hackathon.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Event = hackathon }));
        }

        [Authorize(Policy = "IsEventHost")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteHackathon(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        [HttpPost("{id}/cancel")]
        public async Task<ActionResult> CancelEvent(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateIsCanceled.Command { Id = id }));
        }
    }
}