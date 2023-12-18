using Application.Companies;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CompaniesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetCompanies()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompany(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [Authorize(Roles = "Moderator,Admin")]
        [HttpPost]
        public async Task<ActionResult> CreateCompany([FromBody] Company company)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Company = company }));
        }

        [Authorize(Roles = "Moderator,Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditCompany(Guid id, [FromBody] Company company)
        {
            company.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Company = company }));
        }

        [Authorize(Roles = "Moderator,Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}