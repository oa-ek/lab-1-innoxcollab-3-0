using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class List
    {
        public class Query : IRequest<List<ProfileDto>>
        {
        }
        public class Handler : IRequestHandler<Query, List<ProfileDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }
            public async Task<List<ProfileDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var users = await context.Users
                    .ProjectTo<ProfileDto>(mapper.ConfigurationProvider)
                    .ToListAsync();

                return users;
            }
        }
    }
}