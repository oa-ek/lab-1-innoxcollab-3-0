using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Companies;

public class Delete
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }
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
            var company = await context.Companies.Include(x => x.Representers)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

            if (company is null) return null;

            foreach (var representer in company.Representers)
                representer.Company = null;

            context.Companies.Remove(company);

            var result = await context.SaveChangesAsync() > 0;

            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to delete company!");
        }
    }
}