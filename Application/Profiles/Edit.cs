using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Profiles
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public AppUser User { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IMapper mapper;
            private readonly UserManager<AppUser> userManager;

            public Handler(IMapper mapper, UserManager<AppUser> userManager)
            {
                this.mapper = mapper;
                this.userManager = userManager;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userManager.FindByIdAsync(request.User.Id);

                if (user is null)
                    return null;

                mapper.Map(request.User, user);
                var result = await userManager.UpdateAsync(user);

                if (!result.Succeeded)
                    return Result<Unit>.Failure("Failed to edit user");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}