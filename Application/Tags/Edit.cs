using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Tags
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Tag Tag { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IMapper mapper;
            private readonly DataContext context;

            public Handler(IMapper mapper, DataContext context)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var tag = await context.Tags.FindAsync(request.Tag.Id);

                if (tag is null)
                    return null;

                mapper.Map(request.Tag, tag);

                var result = await context.SaveChangesAsync() > 0;

                if (!result)
                    return Result<Unit>.Failure("Failed to edit tag");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}