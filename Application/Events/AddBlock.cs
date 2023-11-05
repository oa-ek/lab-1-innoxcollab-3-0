using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class AddBlock
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
            public EventBlock EventBlock { get; set; }

            public class Handler : IRequestHandler<Command, Result<Unit>>
            {
                private readonly DataContext context;

                public Handler(DataContext context)
                {
                    this.context = context;
                }

                public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
                {
                    if (request.EventBlock is null)
                        return null;

                    var @event = await context.Events.FindAsync(request.Id);

                    if (@event is null)
                        return null;

                    @event.Blocks.Add(request.EventBlock);

                    var result = await context.SaveChangesAsync() > 0;

                    if (!result)
                        return Result<Unit>.Failure("Failed to add the block!");

                    return Result<Unit>.Success(Unit.Value);
                }
            }
        }
    }
}