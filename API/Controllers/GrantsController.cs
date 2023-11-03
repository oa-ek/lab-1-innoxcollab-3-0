using Application.Events;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class GrantsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetGrants()
        {
            return HandleResult(await Mediator.Send(new Application.Grants.List.Query()));
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetGrant(Guid id)
        {
            return HandleResult(await Mediator.Send(new Application.Grants.Details.Query { Id = id }));
        }
        [HttpPost]
        public async Task<IActionResult> CreateGrant([FromBody] Grant grant)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Event = grant }));
        }

        [Authorize(Policy = "IsEventHost")]
        [HttpPut("{id}")]
        public async Task<ActionResult> EditGrant(Guid id, [FromBody] Grant grant)
        {
            grant.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Event = grant }));
        }

        [Authorize(Policy = "IsEventHost")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteGrant(Guid id)
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