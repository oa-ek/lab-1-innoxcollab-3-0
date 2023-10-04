using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;

namespace Infrastructure.MediatoR.Events
{
    public class Details
    {
        public class Query : IRequest<Event>{
            public Guid Id {get; set;}
        }
        public class Handler : IRequestHandler<Query, Event>
        {
            public DataContext Context { get; }
            public Handler(DataContext context)
            {
                Context = context;
                
            }
            public async Task<Event> Handle(Query request, CancellationToken cancellationToken)
            {
                return await Context.Events.FindAsync(request.Id);
            }
        }
    }
}