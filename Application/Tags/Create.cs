using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Tags
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Tag Tag { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                await context.Tags.AddAsync(request.Tag);
                var result = await context.SaveChangesAsync() > 0;

                if (!result)
                    return Result<Unit>.Failure("Failed to create tag");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}