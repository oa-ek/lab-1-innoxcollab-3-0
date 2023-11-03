using Application.Accelerators;
using Application.Events;
using Application.Grants;
using Application.Hackathons;
using Application.Profiles;
using Application.Tags;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        // d - destination
        // o - options
        // s - source
        public MappingProfiles()
        {
            CreateMap<Event, Event>();
            CreateMap<Tag, TagDto>();

            CreateMap<AppUser, ProfileDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.Bio));

            CreateMap<Event, EventDto>()
                .ForMember(d => d.CreatorProfile, o => o.MapFrom(s => s.AppUser))
                .ForMember(d => d.EventType, o => o.MapFrom(s => s.GetType().Name))
                .ForMember(d => d.Blocks, o => o.MapFrom(s => s.Blocks));

            CreateMap<Accelerator, AcceleratorDto>()
                .ForMember(d => d.CreatorProfile, o => o.MapFrom(s => s.AppUser))
                .ForMember(d => d.Blocks, o => o.MapFrom(s => s.Blocks));

            CreateMap<Grant, GrantDto>()
                .ForMember(d => d.CreatorProfile, o => o.MapFrom(s => s.AppUser))
                .ForMember(d => d.Blocks, o => o.MapFrom(s => s.Blocks));

            CreateMap<Hackathon, HackathonDto>()
                .ForMember(d => d.CreatorProfile, o => o.MapFrom(s => s.AppUser))
                .ForMember(d => d.Blocks, o => o.MapFrom(s => s.Blocks));

            CreateMap<EventBlock, EventBlockDto>();
        }
    }

}