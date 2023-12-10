using Domain;
using FluentValidation;

namespace Application.Validation
{
    public class HackathonValidator : EventValidator<Hackathon>
    {
        public HackathonValidator() : base()
        {
            RuleFor(x => x.ChallengeStatement).NotEmpty();
            RuleFor(x => x.Prize).GreaterThanOrEqualTo(0);
        }
    }
}