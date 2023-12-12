using Domain;
using Domain.Enums;
using FluentValidation;

namespace Application.Validation
{
    public class EventValidator : AbstractValidator<Event>
    {
        public EventValidator()
        {
            RuleFor(x => x.Title).NotEmpty().MaximumLength(40);
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.ShortDescription).NotEmpty().MaximumLength(40);
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Venue).NotEmpty().MaximumLength(40);
            RuleFor(x => x.Status).IsInEnum().WithMessage("Invalid event status");
        }
    }
}