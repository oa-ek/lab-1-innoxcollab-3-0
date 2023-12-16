using Application.Core;
using Application.Validation;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Companies;

public class Create
{
    public class Command : IRequest<Result<Unit>>
    {
        public Company Company { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.Company).SetValidator(new CompanyValidator());
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
            await context.Companies.AddAsync(request.Company);

            var result = await context.SaveChangesAsync() > 0;

            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to create a company!");
        }
    }
}