using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Event Event { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var @event = await context.Events.Include(x => x.Tags)
                    .FirstOrDefaultAsync(x => x.Id == request.Event.Id);

                if (@event is null)
                    return null;

				var existingTags = new List<Tag>();

                foreach (var tag in request.Event.Tags)
                    existingTags.Add(await context.Tags.FindAsync(tag.Id));

				mapper.Map(request.Event, @event);

                @event.Tags = existingTags;

				var result = await context.SaveChangesAsync() > 0;

				if (!result)
                    return Result<Unit>.Failure("Failed to edit the event!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}