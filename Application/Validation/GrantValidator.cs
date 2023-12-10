using Domain;
using FluentValidation;

namespace Application.Validation
{
    public class GrantValidator : EventValidator<Grant>
    {
        public GrantValidator() : base()
        {
            RuleFor(x => x.GrantAmount).GreaterThanOrEqualTo(0);
        }
    }
}