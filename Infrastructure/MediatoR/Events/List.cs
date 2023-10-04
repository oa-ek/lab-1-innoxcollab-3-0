using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.MediatoR.Events
{
    public class List
    {
        public class Query : IRequest<List<Event>>{}
    

        public class Handler : IRequestHandler<Query, List<Event>>
        {
            public DataContext Context { get; }
            public Handler(DataContext context)
            {
                Context = context;
                
            }
            public async Task<List<Event>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await Context.Events.ToListAsync();
            }
        }
    }
   
}