using Domain;
using FluentValidation;

namespace Application.Validation
{
    public class EventValidator : AbstractValidator<Event>
    {
        public EventValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            //RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.ShortDescription).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Venue).NotEmpty();
        }
    }
}