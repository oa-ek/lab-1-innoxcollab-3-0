using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Profiles
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public AppUser User { get; set; }
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
                await context.Users.AddAsync(request.User);

                var result = await context.SaveChangesAsync() > 0;

                if (!result)
                    return Result<Unit>.Failure("Failed to create user");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}