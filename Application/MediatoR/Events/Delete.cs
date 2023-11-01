using MediatR;
using Persistence;

namespace Application.MediatoR.Events
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var deleteEvent = await context.Events.FindAsync(request.Id);

                context.Events.Remove(deleteEvent);

                await context.SaveChangesAsync();
            }
        }
    }
}