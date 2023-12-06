using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Profiles
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public AppUser User { get; set; }
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
                var user = await context.Users.FindAsync(request.User.Id);
                if (user is null)
                    return null;

                mapper.Map(request.User, user);

                var result = await context.SaveChangesAsync() > 0;
                if (!result)
                    return Result<Unit>.Failure("Failed to edit user");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}