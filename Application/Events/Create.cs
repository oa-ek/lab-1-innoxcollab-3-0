using Application.Core;
using Application.Validation;
using Domain;
using FluentValidation;
using MediatR;
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
                public Handler(DataContext context)
                {
                    this.context = context;
                }
                public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
                {
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