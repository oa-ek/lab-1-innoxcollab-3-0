using Application.Companies;
using Application.Events;
using Application.Profiles;
using Application.Tags;
using Application.Types;
using AutoMapper;
using Domain;
using Type = Domain.Type;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        // d - destination
        // o - options!
        // s - source
        public MappingProfiles()
        {
            CreateMap<Event, Event>()
                .ForMember(d => d.Tags, o => o.MapFrom(s => s.Tags))
                .ForMember(d => d.Status, o => o.MapFrom(s => s.Status))
                .ForMember(d => d.Blocks, o => o.MapFrom(s => s.Blocks))
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<Tag, Tag>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<Company, Company>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<AppUser, AppUser>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<Tag, TagDto>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<AppUser, ProfileDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.DisplayName))
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.Bio))
                .ForMember(d => d.Email, o => o.MapFrom(s => s.Email))
                .ForMember(d => d.Company, o => o.MapFrom(s => s.Company))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photo.Url));

            CreateMap<Event, EventDto>()
                .ForMember(d => d.CreatorProfile, o => o.MapFrom(s => s.AppUser))
                .ForMember(d => d.Type, o => o.MapFrom(s => s.Type.Name))
                .ForMember(d => d.RelatedPhoto, o => o.MapFrom(s => s.RelatedPhoto))
                .ForMember(d => d.Blocks, o => o.MapFrom(s => s.Blocks));

            CreateMap<EventBlock, EventBlockDto>();

            CreateMap<Company, CompanyDto>()
                .ForMember(d => d.Representers, o => o.MapFrom(s => s.Representers))
                .ForMember(d => d.Events, o => o.MapFrom(s => s.Events));

            CreateMap<Type, TypeDto>();
        }
    }
}