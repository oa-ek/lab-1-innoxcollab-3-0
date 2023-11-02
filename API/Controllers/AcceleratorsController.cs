using Application.Events;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AcceleratorsController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> CreateAccelerator([FromBody] Accelerator accelerator)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Event = accelerator }));
        }
    }
}