using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Companies;

public class List
{
    public class Query : IRequest<Result<List<CompanyDto>>>
    {
    }

    public class Handler : IRequestHandler<Query, Result<List<CompanyDto>>>
    {
        private readonly DataContext context;
        private readonly IMapper mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<Result<List<CompanyDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var companies = await context.Companies.ProjectTo<CompanyDto>(mapper.ConfigurationProvider).ToListAsync();

            return Result<List<CompanyDto>>.Success(companies);
        }
    }
}