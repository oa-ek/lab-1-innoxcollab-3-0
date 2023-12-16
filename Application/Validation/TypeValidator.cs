using FluentValidation;
using Type = Domain.Type;

namespace Application.Validation;

public class TypeValidator : AbstractValidator<Type>
{
    public TypeValidator()
    {
        RuleFor(x => x.Name).NotEmpty();
    }
}