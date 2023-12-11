using Domain;
using FluentValidation;

namespace Application.Validation
{
    public class AcceleratorValidator : AbstractValidator<Accelerator>
    {
        public AcceleratorValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.ShortDescription).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Venue).NotEmpty();
            RuleFor(x => x.ProgramDuration).NotEmpty();
            RuleFor(x => x.ProgramOffer).NotEmpty();
        }
    }
}