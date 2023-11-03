using Application.Events;

namespace Application.Grants
{
    public class GrantDto : EventDto
    {
        public decimal GrantAmount { get; set; }
    }
}