using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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

        public IsHostRequirementHandler(DataContext dataContext, IHttpContextAccessor httpContextAccessor)
        {
            this.dataContext = dataContext;
            this.httpContextAccessor = httpContextAccessor;
        }

        protected override async Task<Task> HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId is null)
                return Task.CompletedTask;

            var eventId = Guid.Parse(httpContextAccessor.HttpContext?.Request.RouteValues
                .SingleOrDefault(x => x.Key == "id").Value?.ToString());

            var @event = await dataContext.Events
                .AsNoTracking()
                .Include(x => x.AppUser).FirstOrDefaultAsync(x => x.Id == eventId);

            if (@event is null)
                return Task.CompletedTask;


            if (@event.AppUser.Id == userId)
                context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}