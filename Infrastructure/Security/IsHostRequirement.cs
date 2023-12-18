using System.Security.Claims;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext dataContext;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly UserManager<AppUser> userManager;

        public IsHostRequirementHandler(DataContext dataContext, IHttpContextAccessor httpContextAccessor,
            UserManager<AppUser> userManager)
        {
            this.dataContext = dataContext;
            this.httpContextAccessor = httpContextAccessor;
            this.userManager = userManager;
        }

        protected override async Task<Task> HandleRequirementAsync(AuthorizationHandlerContext context,
            IsHostRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId is null)
                return Task.CompletedTask;

            var user = await userManager.FindByIdAsync(userId);

            if (user is null)
                return Task.CompletedTask;
            
            var userRoles = await userManager.GetRolesAsync(user);

            if (userRoles.Any(x => new[] { "Admin", "Moderator" }.Contains(x)))
            {
                context.Succeed(requirement);
                return Task.CompletedTask;
            }

            var eventId = Guid.Parse(httpContextAccessor.HttpContext?.Request.RouteValues
                .SingleOrDefault(x => x.Key == "id").Value?.ToString()!);

            var @event = await dataContext.Events
                .AsNoTracking()
                .Include(x => x.AppUser).FirstOrDefaultAsync(x => x.Id == eventId);

            if (@event is null)
                return Task.CompletedTask;


            if (@event.AppUserId == userId)
                context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}