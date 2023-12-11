using Domain;
using FluentValidation;

namespace Application.Validation
{
    public class GrantValidator : AbstractValidator<Grant>
    {
        public GrantValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.ShortDescription).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Venue).NotEmpty();
            RuleFor(x => x.GrantAmount).GreaterThanOrEqualTo(0);
        }
    }
}