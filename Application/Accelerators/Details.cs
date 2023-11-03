using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Accelerators
{
    public class Details
    {
        public class Query : IRequest<Result<AcceleratorDto>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<AcceleratorDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }
            public async Task<Result<AcceleratorDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var @event = await context.Events
                .ProjectTo<AcceleratorDto>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<AcceleratorDto>.Success(@event);
            }
        }
    }
}
