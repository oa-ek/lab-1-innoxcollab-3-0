using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Hackathons
{
public class List
    {
        public class Query : IRequest<Result<List<HackathonDto>>> { }


        public class Handler : IRequestHandler<Query, Result<List<HackathonDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }
            public async Task<Result<List<HackathonDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var hackathons = await context.Hackathons
                    .ProjectTo<HackathonDto>(mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<HackathonDto>>.Success(hackathons);
            }
        }
    }
}