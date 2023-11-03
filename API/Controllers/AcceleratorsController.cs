using Application.Events;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AcceleratorsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAccelerators()
        {
            return HandleResult(await Mediator.Send(new Application.Accelerators.List.Query()));
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetAccelerator(Guid id)
        {
            return HandleResult(await Mediator.Send(new Application.Accelerators.Details.Query { Id = id }));
        }
        [HttpPost]
        public async Task<IActionResult> CreateAccelerator([FromBody] Accelerator accelerator)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Event = accelerator }));
        }

        [Authorize(Policy = "IsEventHost")]
        [HttpPut("{id}")]
        public async Task<ActionResult> EditAccelerator(Guid id, [FromBody] Accelerator accelerator)
        {
            accelerator.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Event = accelerator }));
        }

        [Authorize(Policy = "IsEventHost")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAccelerator(Guid id)
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