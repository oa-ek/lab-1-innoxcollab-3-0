using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Grants
{
    public class Details
    {
        public class Query : IRequest<Result<GrantDto>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<GrantDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }
            public async Task<Result<GrantDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var grant = await context.Grants
                    .ProjectTo<GrantDto>(mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<GrantDto>.Success(grant);
            }
        }
    }
}