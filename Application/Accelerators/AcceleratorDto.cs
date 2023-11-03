using Application.Events;

namespace Application.Accelerators
{
    public class AcceleratorDto : EventDto
    {
        public DateTime ProgramDuration { get; set; }
        public string ProgramOffer { get; set; }
    }
}