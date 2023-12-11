using Domain;
using FluentValidation;

namespace Application.Validation
{
    public class HackathonValidator : AbstractValidator<Hackathon>
    {
        public HackathonValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.ShortDescription).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Venue).NotEmpty();
            RuleFor(x => x.ChallengeStatement).NotEmpty();
            RuleFor(x => x.Prize).GreaterThanOrEqualTo(0);
        }
    }
}