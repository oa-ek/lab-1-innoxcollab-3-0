using Application.Events;

namespace Application.Hackathons
{
    public class HackathonDto : EventDto
    {
        public string ChallengeStatement { get; set; }
        public decimal Prize { get; set; }
    }
}