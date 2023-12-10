using Domain;
using FluentValidation;

namespace Application.Validation
{
    public class TagValidation : AbstractValidator<Tag>
    {
        public TagValidation()
        {
            RuleFor(x => x.Name).NotEmpty().MinimumLength(2);
        }
    }
}