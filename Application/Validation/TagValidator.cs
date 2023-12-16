using Domain;
using FluentValidation;

namespace Application.Validation
{
    public class TagValidator : AbstractValidator<Tag>
    {
        public TagValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MinimumLength(2).MaximumLength(10);
        }
    }
}