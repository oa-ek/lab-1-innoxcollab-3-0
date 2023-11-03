using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events
{
    public class Search
    {
        public class Query : IRequest<Result<List<EventDto>>>
        {
            public string SearchTerm { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<EventDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<List<EventDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var events = await context.Events
                    .ProjectTo<EventDto>(mapper.ConfigurationProvider)
                    .Where(e =>
                        EF.Functions.Like(e.Title, $"%{request.SearchTerm}%") ||
                        EF.Functions.Like(e.Description, $"%{request.SearchTerm}%") ||
                        EF.Functions.Like(e.ShortDescription, $"%{request.SearchTerm}%") ||
                        EF.Functions.Like(e.Venue, $"%{request.SearchTerm}%") ||
                        EF.Functions.Like(e.CreatorProfile.DisplayName, $"%{request.SearchTerm}%") ||
                        e.Tags.Any(t => EF.Functions.Like(t.Name, $"%{request.SearchTerm}%")))
                    .ToListAsync();

                return Result<List<EventDto>>.Success(events);
            }
        }
    }
}