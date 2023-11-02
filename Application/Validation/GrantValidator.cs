using Domain;

namespace Application.Validation
{
    public class GrantValidator : EventValidator<Grant>
    {
        public GrantValidator() : base()
        {
            //RuleFor(x => x.GrantAmount).NotEmpty();
        }
    }
}