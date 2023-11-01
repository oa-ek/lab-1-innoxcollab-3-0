using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.MediatoR.Events
{
    public class Details
    {
        public class Query : IRequest<Event>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Event>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }
            public async Task<Event> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Events.FindAsync(request.Id);
            }
        }
    }
}