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
        public class Query : IRequest<Result<PagedList<EventDto>>>
        {
            public PagingParams Params { get; set; }
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

                return Result<PagedList<EventDto>>.Success(await PagedList<EventDto>
                    .CreateAsync(query, request.Params.PageNumber, request.Params.PageSize));
            }
        }
    }

}