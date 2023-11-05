using System.Security.Claims;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Security
{
    public class RoleRequirement : IAuthorizationRequirement
    {
        public string requiredRole { get; }
        public RoleRequirement(string requiredRole)
        {
            this.requiredRole = requiredRole;
        }
    }

    public class RoleRequirementHandler : AuthorizationHandler<RoleRequirement>
    {
        private readonly UserManager<AppUser> userManager;
        public RoleRequirementHandler(UserManager<AppUser> userManager)
        {
            this.userManager = userManager;
        }

        protected override async Task<Task> HandleRequirementAsync(AuthorizationHandlerContext context, RoleRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId is null)
                return Task.CompletedTask;

            var user = await userManager.FindByIdAsync(userId);

            if (user is null)
                return Task.CompletedTask;

            var roles = await userManager.GetRolesAsync(user);

            if (roles.Contains(requirement.requiredRole))
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}