using Application.Core;
using Application.Validation;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Profiles
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public AppUser User { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.User.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.User.UserName).NotEmpty();
                RuleFor(x => x.User.DisplayName).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly UserManager<AppUser> userManager;

            public Handler(UserManager<AppUser> userManager)
            {
                this.userManager = userManager;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                const string temporaryPassword = "Test11!";

                var result = await userManager.CreateAsync(request.User, temporaryPassword);

                if (result.Succeeded)
                    return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Failed to create User");
            }
        }
    }
}