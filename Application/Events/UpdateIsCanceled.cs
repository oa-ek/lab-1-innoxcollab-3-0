using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events
{
    public class UpdateIsCanceled
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IUserAccessor userAccesor;
            private readonly DataContext context;

            public Handler(DataContext context, IUserAccessor userAccesor)
            {
                this.context = context;
                this.userAccesor = userAccesor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var @event = await context.Events
                    .Include(x => x.AppUser).FirstOrDefaultAsync(x => x.Id == request.Id);

                if (@event is null)
                    return null;

                @event.IsCanceled = !@event.IsCanceled;

                var result = await context.SaveChangesAsync() > 0;

                if (!result)
                    return Result<Unit>.Failure("Problem canceling event");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}