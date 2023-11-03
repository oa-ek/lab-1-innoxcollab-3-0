using Domain;
using FluentValidation;

namespace Application.Validation
{
    public class AcceleratorValidator : EventValidator<Accelerator>
    
    {
        public AcceleratorValidator() : base()
        {
            RuleFor(x => x.ProgramDuration).NotEmpty();
            RuleFor(x => x.ProgramOffer).NotEmpty();
        }
    }
}