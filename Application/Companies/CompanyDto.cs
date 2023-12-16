using Application.Events;
using Application.Profiles;

namespace Application.Companies;

public class CompanyDto
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Url { get; set; }
    public string Description { get; set; }
    public IEnumerable<ProfileDto> Representers { get; set; }
    public IEnumerable<EventDto> Events { get; set; }
}