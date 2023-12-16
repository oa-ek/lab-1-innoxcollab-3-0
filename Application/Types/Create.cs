using Application.Core;
using Application.Validation;
using FluentValidation;
using MediatR;
using Persistence;
using Type = Domain.Type;

namespace Application.Types;

public class Create
{
    public class Command : IRequest<Result<Unit>>
    {
        public Type Type { get; init; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.Type).SetValidator(new TypeValidator());
        }
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
            await context.Types.AddAsync(request.Type);

            var result = await context.SaveChangesAsync() > 0;

            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to create a type!");
        }
    }
}