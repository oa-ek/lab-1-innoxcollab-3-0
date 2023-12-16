using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Companies;

public class Details
{
    public class Query : IRequest<Result<CompanyDto>>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<CompanyDto>>
    {
        private readonly DataContext context;
        private readonly IMapper mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<Result<CompanyDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var company = await context.Companies.ProjectTo<CompanyDto>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

            return Result<CompanyDto>.Success(company);
        }
    }
}