using Application.Accelerators;
using Application.Events;
using Application.Grants;
using Application.Hackathons;
using Application.Profiles;
using Application.Tags;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        // d - destination
        // o - options!
        // s - source
        // private readonly UserManager<AppUser> userManager;
        public MappingProfiles()
        {
            // this.userManager = userManager;

            CreateMap<Event, Event>();
            CreateMap<Tag, TagDto>();

            CreateMap<AppUser, ProfileDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.DisplayName))
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.Bio))
                // .ForMember(d => d.Role, o => o.MapFrom(s => userManager.GetRolesAsync(s)))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url));

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