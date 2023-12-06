using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class List
    {
        public class Query : IRequest<Result<List<ProfileDto>>>
        {
            public string Username { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<List<ProfileDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                this.mapper = mapper;
                this.userAccessor = userAccessor;
                this.context = context;
            }
            public async Task<Result<List<ProfileDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var users = await context.Users
                    .ProjectTo<ProfileDto>(mapper.ConfigurationProvider,
                    new { currentUsername = userAccessor.GetUserName() })
                    .ToListAsync();

                return Result<List<ProfileDto>>.Success(users);
            }
        }
    }
}