using Domain;
using FluentValidation;

namespace Application.Validation
{
    public class GrantValidator : AbstractValidator<Grant>
    {
        public GrantValidator()
        {
            RuleFor(x => x.Title).NotEmpty().MaximumLength(40);
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.ShortDescription).NotEmpty().MaximumLength(40);
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Venue).NotEmpty().MaximumLength(40);
            RuleFor(x => x.Status).IsInEnum().WithMessage("Invalid event status");
            RuleFor(x => x.GrantAmount).GreaterThanOrEqualTo(0);
        }
    }
}