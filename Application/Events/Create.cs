using Application.Core;
using Application.Interfaces;
using Application.Validation;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Event Event { get; set; }
            public class Handler : IRequestHandler<Command, Result<Unit>>
            {
                public class CommandValidator : AbstractValidator<Command>
                {
                    public CommandValidator()
                    {
                        RuleFor(x => x.Event).SetValidator(new EventValidator<Event>());
                    }
                }
                private readonly DataContext context;
                private readonly IUserAccessor userAccesor;

                public Handler(DataContext context, IUserAccessor userAccesor)
                {
                    this.context = context;
                    this.userAccesor = userAccesor;
                }
                public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
                {
                    var user = await context.Users
                        .FirstOrDefaultAsync(x => x.UserName == userAccesor.GetUserName());

                    request.Event.AppUser = user;

                    var existingTags = new List<Tag>();

                    foreach (var tag in request.Event.Tags)
                        existingTags.Add(await context.Tags.FindAsync(tag.Id));

                    request.Event.Tags = existingTags;

                    await context.Events.AddAsync(request.Event);
                    var result = await context.SaveChangesAsync() > 0;

                    if (!result)
                        return Result<Unit>.Failure("Failed to create the event!");

                    return Result<Unit>.Success(Unit.Value);
                }
            }
        }
    }
}