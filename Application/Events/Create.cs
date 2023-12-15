using Application.Core;
using Application.Interfaces;
using Application.Validation;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events;

public class Create
{
    public class Command : IRequest<Result<Unit>>
    {
        public Event Event { get; init; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.Event).SetValidator(new EventValidator());
        }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext context;
        private readonly IUserAccessor userAccessor;

        public Handler(DataContext context, IUserAccessor userAccessor)
        {
            this.context = context;
            this.userAccessor = userAccessor;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await context.Users
                .FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUserName());

            request.Event.AppUser = user;

            var existingTags = new List<Tag>();

            foreach (var tag in request.Event.Tags)
                existingTags.Add(await context.Tags.FindAsync(tag.Id));

            foreach (var block in request.Event.Blocks)
                await context.AddAsync(block);

            request.Event.Tags = existingTags;

            await context.Events.AddAsync(request.Event);

            var result = await context.SaveChangesAsync() > 0;

            return !result
                ? Result<Unit>.Failure("Failed to create the event!")
                : Result<Unit>.Success(Unit.Value);
        }
    }
}