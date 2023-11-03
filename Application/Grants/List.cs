using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Grants
{
    public class List
    {
        public class Query : IRequest<Result<List<GrantDto>>> { }


        public class Handler : IRequestHandler<Query, Result<List<GrantDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }
            public async Task<Result<List<GrantDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var grants = await context.Grants
                    .ProjectTo<GrantDto>(mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<GrantDto>>.Success(grants);
            }
        }
    }
}