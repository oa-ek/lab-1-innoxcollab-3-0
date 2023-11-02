using Application.Core;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var @event = await context.Events.FindAsync(request.Id);

                if (@event is null)
                    return null;

                context.Events.Remove(@event);

                var result = await context.SaveChangesAsync() > 0;
                
                if (!result)
                    return Result<Unit>.Failure("Failed to delete the event");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}