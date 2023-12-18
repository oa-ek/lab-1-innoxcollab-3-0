using Application.Tags;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TagsController : BaseApiController
    {
        [Authorize(Roles = "Publisher,Moderator,Admin")]
        [HttpGet]
        public async Task<IActionResult> GetTags()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [Authorize(Roles = "Publisher,Moderator,Admin")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTag(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }
        [Authorize(Roles = "Publisher,Moderator,Admin")]
        [HttpPost]
        public async Task<ActionResult> CreateTag([FromBody] Tag tag)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Tag = tag }));
        }

        [Authorize(Roles = "Moderator,Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditTag(Guid id, [FromBody] Tag tag)
        {
            tag.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Tag = tag }));
        }
        
        [Authorize(Roles = "Moderator,Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTag(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}