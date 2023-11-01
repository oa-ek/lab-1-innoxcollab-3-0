using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.MediatoR.Events
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Event Event { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var @event = await context.Events.FindAsync(request.Event.Id);

                mapper.Map(request.Event, @event);

                await context.SaveChangesAsync();
            }
        }
    }
}