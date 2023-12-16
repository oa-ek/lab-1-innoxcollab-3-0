using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Companies;

public class Edit
{
    public class Command : IRequest<Result<Unit>>
    {
        public Company Company { get; set; }
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
            var company = await context.Companies.FindAsync(request.Company.Id);

            if (company is null) return null;

            var representers = new List<AppUser>();

            if (company.Representers != request.Company.Representers)
            {
                foreach (var representer in request.Company.Representers)
                    representers.Add(await context.Users.FindAsync(representer.Id));
            }

            mapper.Map(request.Company, company);

            company.Representers = representers;

            var result = await context.SaveChangesAsync() > 0;

            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to edit company!");
        }
    }
}