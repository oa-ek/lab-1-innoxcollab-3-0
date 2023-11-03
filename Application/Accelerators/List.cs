using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Accelerators
{
    public class List
    {
        public class Query : IRequest<Result<List<AcceleratorDto>>> { }


        public class Handler : IRequestHandler<Query, Result<List<AcceleratorDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }
            public async Task<Result<List<AcceleratorDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var allEvents = await context.Accelerators
                    .ProjectTo<AcceleratorDto>(mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<AcceleratorDto>>.Success(allEvents);
            }
        }
    }
}