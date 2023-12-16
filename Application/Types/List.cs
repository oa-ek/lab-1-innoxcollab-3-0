using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Types;

public class List
{
    public class Query : IRequest<Result<List<TypeDto>>>
    {
    }

    public class Handler : IRequestHandler<Query, Result<List<TypeDto>>>
    {
        private readonly DataContext context;
        private readonly IMapper mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<Result<List<TypeDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var types = await context.Types.ProjectTo<TypeDto>(mapper.ConfigurationProvider).ToListAsync();

            return Result<List<TypeDto>>.Success(types);
        }
    }
}