using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tags
{
    public class List
    {
        public class Query : IRequest<Result<List<TagDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<TagDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<List<TagDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var tags = await context.Tags
                    .ProjectTo<TagDto>(mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<TagDto>>.Success(tags);
            }
        }
    }
}