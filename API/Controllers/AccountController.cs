using System.Security.Claims;
using API.DTOs;
using API.Services;
using Domain;
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

        public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
        {
            this.userManager = userManager;
            this.tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await userManager.Users.Include(x => x.Photo)
                .FirstOrDefaultAsync(x => x.Email == loginDto.Email);

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
                return await CreateUserObject(user);

            return BadRequest(result.Errors);
        }

        [HttpGet("current")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await userManager.Users.Include(p => p.Photo)
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            return await CreateUserObject(user);
        }

        private async Task<UserDto> CreateUserObject(AppUser user)
        {
            var roles = await userManager.GetRolesAsync(user);
            return new UserDto
            {
                Id = user.Id,
                DisplayName = user.DisplayName,
                Image = user.Photo?.Url,
                Token = await tokenService.CreateToken(user),
                UserName = user.UserName,
                Roles = roles
            };
        }
    }
}