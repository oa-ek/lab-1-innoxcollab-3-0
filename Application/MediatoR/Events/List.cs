using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.MediatoR.Events
{
    public class List
    {
        public class Query : IRequest<List<EventDto>> { }


        public class Handler : IRequestHandler<Query, List<EventDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }
            public async Task<List<EventDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var allEvents = await context.Events
                    .ProjectTo<EventDto>(mapper.ConfigurationProvider)
                    .ToListAsync();
                    
                return allEvents;
            }
        }
    }

}