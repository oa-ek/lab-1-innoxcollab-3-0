using Application.Core;
using Application.Events.Helpers;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<EventDto>>>
        {
            public EventParams Params { get; init; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<EventDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<PagedList<EventDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = context.Events
                    .ProjectTo<EventDto>(mapper.ConfigurationProvider)
                    .AsQueryable();

                if (request.Params.Status > -1)
                    query = query.Where(x => x.Status == request.Params.Status);

                if (request.Params.TagName is not null)
                    query = query.Where(e => e.Tags.Any(x => x.Name == request.Params.TagName));

                if (request.Params.EventType is not null)
                    query = query.Where(e => e.Type.Name == request.Params.EventType);

                if (request.Params.SearchTerm is not null)
                {
                    query = query.Where(e =>
                        EF.Functions.Like(e.Title, $"%{request.Params.SearchTerm}%") ||
                        EF.Functions.Like(e.Description, $"%{request.Params.SearchTerm}%") ||
                        EF.Functions.Like(e.ShortDescription, $"%{request.Params.SearchTerm}%") ||
                        EF.Functions.Like(e.Venue, $"%{request.Params.SearchTerm}%") ||
                        EF.Functions.Like(e.CreatorProfile.DisplayName, $"%{request.Params.SearchTerm}%") ||
                        e.Tags.Any(t => EF.Functions.Like(t.Name, $"%{request.Params.SearchTerm}%")));
                }

                return Result<PagedList<EventDto>>.Success(await PagedList<EventDto>
                    .CreateAsync(query, request.Params.PageNumber, request.Params.PageSize));
            }
        }
    }
}