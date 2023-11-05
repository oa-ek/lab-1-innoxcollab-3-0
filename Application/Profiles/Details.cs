using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<Result<ProfileDto>>
        {
            public string UserName { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<ProfileDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }
            public async Task<Result<ProfileDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await context.Users
                    .ProjectTo<ProfileDto>(mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.UserName == request.UserName);
                
                return Result<ProfileDto>.Success(user);
            }
        }
    }
}