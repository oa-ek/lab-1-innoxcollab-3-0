using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;

namespace Infrastructure.MediatoR.Events
{
    public class Edit
    {
        public class Command : IRequest{
            public Event @event {get; set;}
        }
        public class Handler : IRequestHandler<Command>
        {
            public DataContext Context { get; }
            public IMapper Mapper { get; }
            public Handler(DataContext context, IMapper mapper)
            {
                Mapper = mapper;
                Context = context;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var @event = await Context.Events.FindAsync(request.@event.Id);

                Mapper.Map(request.@event, @event);

                await Context.SaveChangesAsync();
            }
        }
    }
}