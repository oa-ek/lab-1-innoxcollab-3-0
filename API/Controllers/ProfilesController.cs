using Application.Profiles;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [Authorize(Roles = "Moderator,Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllProfiles()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
        
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
        }

        [Authorize(Roles = "Moderator,Admin")]
        [HttpPost]
        public async Task<ActionResult> CreateProfile([FromBody] AppUser appUser)
        {
            return HandleResult(await Mediator.Send(new Create.Command { User = appUser }));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditProfile(string id, [FromBody] AppUser user)
        {
            user.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { User = user }));
        }

        [Authorize(Roles = "Moderator,Admin")]
        [HttpDelete("{username}")]
        public async Task<ActionResult> DeleteProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Username = username }));
        }
    }
}