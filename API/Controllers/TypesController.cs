using Application.Types;
using Microsoft.AspNetCore.Mvc;
using Type = Domain.Type;

namespace API.Controllers
{
    public class TypesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetTypes()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpPost]
        public async Task<ActionResult> CreateType([FromBody] Type type)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Type = type }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditType(Guid id, [FromBody] Type type)
        {
            type.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Type = type }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteType(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}