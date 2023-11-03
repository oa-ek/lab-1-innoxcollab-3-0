using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events
{
    public class List
    {
        public class Query : IRequest<Result<List<EventDto>>> { }


        public class Handler : IRequestHandler<Query, Result<List<EventDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }
            public async Task<Result<List<EventDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var events = await context.Events
                    .ProjectTo<EventDto>(mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<EventDto>>.Success(events);
            }
        }
    }

}