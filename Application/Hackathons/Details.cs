using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Hackathons
{
public class Details
    {
        public class Query : IRequest<Result<HackathonDto>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<HackathonDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }
            public async Task<Result<HackathonDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var hackathon = await context.Hackathons
                    .ProjectTo<HackathonDto>(mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<HackathonDto>.Success(hackathon);
            }
        }
    }
}