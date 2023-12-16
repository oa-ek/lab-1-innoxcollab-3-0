using Application.Core;
using AutoMapper;
using MediatR;
using Persistence;
using Type = Domain.Type;

namespace Application.Types;

public class Edit
{
    public class Command : IRequest<Result<Unit>>
    {
        public Type Type { get; set; }
    }
    
    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext context;
        private readonly IMapper mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            if (request.Type is null)
                return null;

            var type = await context.Types.FindAsync(request.Type.Id);

            type.Name = request.Type.Name;

            var result = await context.SaveChangesAsync() > 0;

            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to edit a type");
        }
    }
}