using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;

namespace Infrastructure.MediatoR.Events
{
    public class Create
    {
        public class Command : IRequest{
            public Event @event {get; set;}
        }
        public class Handler : IRequestHandler<Command>
        {
            public DataContext Context { get; }
            public Handler(DataContext context)
            {
                Context = context;
                
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                await Context.Events.AddAsync(request.@event);

                await Context.SaveChangesAsync();
            }
        }
    }
}