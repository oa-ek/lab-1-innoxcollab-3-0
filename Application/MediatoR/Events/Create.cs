using Domain;
using MediatR;
using Persistence;

namespace Application.MediatoR.Events
{
    public class Create
    {
        public class Command : IRequest
        {
            public Event Event { get; set; }
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
                await context.Events.AddAsync(request.Event);

                await context.SaveChangesAsync();
            }
        }
    }
}