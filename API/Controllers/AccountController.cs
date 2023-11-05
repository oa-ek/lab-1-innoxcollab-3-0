using System.Security.Claims;
using API.DTOs;
using API.Services;
using Application.Profiles;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly TokenService tokenService;
        private IMediator _mediator;
        protected IMediator Mediator => _mediator ??=
        HttpContext.RequestServices.GetService<IMediator>();
        public AccountController(UserManager<AppUser> userManager, TokenService tokenService, IMediator mediatR)
        {
            this.userManager = userManager;
            this.tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await userManager.Users.Include(x => x.Photos).FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user is null)
                return Unauthorized();

            var result = await userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!result)
                return Unauthorized();

            return await CreateUserObject(user);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                return BadRequest("Username is already taken!");
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Username
            };

            var result = await userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(user, "User");
                return await CreateUserObject(user);
            }

            return BadRequest(result.Errors);
        }

        [HttpGet("current")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await userManager.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            return await CreateUserObject(user);
        }

        private async Task<UserDto> CreateUserObject(AppUser user)
        {
            if (user is null)
                return null;

            return new UserDto
            {
                DisplayName = user.DisplayName,
                Image = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
                Token = await tokenService.CreateToken(user),
                UserName = user.UserName
            };
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllAccounts()
        {
            return Ok(await Mediator.Send(new List.Query()));
        }

        // [Authorize(Roles = "Admin")]
        // [HttpDelete("{userName}")]
        // public async Task<IActionResult> DeleteAccount(string userName)
        // {
        //     if (userName is null)
        //         return BadRequest();

        //     var user = await userManager.FindByNameAsync(userName);

        //     if (user is null)
        //         return NotFound("Such user doesn't exists");

        //     await userManager.DeleteAsync(user);
        //     return Ok();
        // }
    }
}