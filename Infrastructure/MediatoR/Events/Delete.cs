using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;

namespace Infrastructure.MediatoR.Events
{
    public class Delete
    {
         public class Command : IRequest{
            public Guid Id {get; set;}
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
                var deleteEvent = await Context.Events.FindAsync(request.Id);

                Context.Events.Remove(deleteEvent);

                await Context.SaveChangesAsync();
            }
        }
    }
}