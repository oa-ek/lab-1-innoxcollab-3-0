using Domain;
using Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Type = Domain.Type;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!context.Events.Any())
            {
                var types = new List<Type>
                {
                    new()
                    {
                        Name = "Hackathon",
                    },
                    new()
                    {
                        Name = "Grant",
                    },
                    new()
                    {
                        Name = "Accelerator",
                    }
                };

                await context.AddRangeAsync(types);

                var companies = new List<Company>
                {
                    new()
                    {
                        Title = "InnoxCollab"
                    },
                    new()
                    {
                        Title = "ROGA TA KOPYTA",
                        Description = "We provide... things... that are... useful... sometimes...",
                        Url = "https://rogatakopyta.com/"
                    },
                    new()
                    {
                        Title = "IT HUB OA",
                        Description =
                            "We provide thing that are completely useless and can't do shit. We don't even work anymore",
                        Url = "https//ithub.oa.edu.ua/"
                    },
                };

                await context.Companies.AddRangeAsync(companies);

                var photos = new List<Photo>
                {
                    new()
                    {
                        Id = "todrjbpggdchhzm1sgkg",
                        Url = "https://res.cloudinary.com/duormgto9/image/upload/v1699132706/todrjbpggdchhzm1sgkg.png",
                        IsMain = true
                    },
                    new()
                    {
                        Id = "ptwkbtzjnnych6sweys5",
                        Url = "https://res.cloudinary.com/duormgto9/image/upload/v1695166717/ptwkbtzjnnych6sweys5.jpg",
                        IsMain = true
                    }
                };

                var users = new List<AppUser>
                {
                    new()
                    {
                        DisplayName = "VIKTOR ZHUKOVSKYI",
                        UserName = "admin",
                        Email = "admin@test.com",
                        Bio = "sunglasses",
                        Company = companies[0],
                        Photo = photos[0],
                    },
                    new()
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com",
                        Bio =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mattis mollis augue a convallis. Curabitur sed mattis nisl, porta pulvinar massa. Sed imperdiet lacus vel ex ullamcorper, eget porta ipsum placerat. Fusce molestie porta ex in pulvinar. Praesent rutrum, mauris in varius consequat, magna est accumsan sapien, id iaculis lectus libero sed lectus. Nullam enim enim, sagittis ut accumsan vel, egestas sodales turpis. Quisque non tellus magna.",
                        Company = companies[1],
                        Photo = photos[1]
                    },
                    new()
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com",
                        Bio = "Weirdo",
                        Company = companies[2]
                    },
                    new()
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com",
                        Bio = "Nice guy",
                        Company = companies[1]
                    },
                };

                foreach (var user in users) await userManager.CreateAsync(user, "Pa$$w0rd");

                var tags = new List<Tag>
                {
                    new()
                    {
                        Name = "Online"
                    },
                    new()
                    {
                        Name = "Offline"
                    },
                    new()
                    {
                        Name = "IT"
                    }
                };

                await context.Tags.AddRangeAsync(tags);

                var accelerators = new List<Event>
                {
                    new()
                    {
                        Title = "Tech Startup Accelerator",
                        Date = DateTime.Now.AddDays(30),
                        ShortDescription = "Accelerate your tech startup",
                        Description =
                            "Join our accelerator program and get access to mentorship, funding, and resources.",
                        Venue = "Tech Hub",
                        IsCanceled = false,
                        AppUser = users[0],
                        Type = types[2],
                        FundingAmount = 50000,
                        Tags = tags,
                        Status = EventStatus.Active
                    },
                    new()
                    {
                        Title = "Social Impact Accelerator",
                        Date = DateTime.Now.AddDays(45),
                        ShortDescription = "Driving positive change in the community",
                        Description =
                            "Our accelerator focuses on startups making a social impact. Join us to make a difference.",
                        Venue = "Community Center",
                        IsCanceled = false,
                        AppUser = users[1],
                        Type = types[2],
                        FundingAmount = 10000,
                        Status = EventStatus.Active
                    },
                    new()
                    {
                        Title = "AI and Machine Learning Accelerator",
                        Date = DateTime.Now.AddDays(60),
                        ShortDescription = "Empowering AI-driven startups",
                        Description =
                            "If you're working on cutting-edge AI or ML projects, our accelerator is the place for you.",
                        Venue = "Innovation Lab",
                        IsCanceled = false,
                        AppUser = users[2],
                        Type = types[2],
                        FundingAmount = 5000,
                        Status = EventStatus.Planned
                    }
                };

                var hackathons = new List<Event>
                {
                    new()
                    {
                        Title = "CodeFest 2023",
                        Date = DateTime.Now.AddDays(60),
                        ShortDescription = "Join the ultimate coding challenge",
                        Description =
                            "CodeFest is a 48-hour coding marathon where developers compete to build amazing projects.",
                        Venue = "Convention Center",
                        IsCanceled = false,
                        AppUser = users[1],
                        Type = types[0],
                        FundingAmount = 3000,
                        Status = EventStatus.Active
                    },
                    new()
                    {
                        Title = "Hack4Good",
                        Date = DateTime.Now.AddDays(90),
                        ShortDescription = "Hacking for a better world",
                        Description =
                            "Join us to use your hacking skills for positive social impact. Together, we can make a difference.",
                        Venue = "Co-working Space",
                        IsCanceled = false,
                        AppUser = users[2],
                        Type = types[0],
                        FundingAmount = 5000,
                        Status = EventStatus.Active
                    },
                    new()
                    {
                        Title = "GameJam 2023",
                        Date = DateTime.Now.AddDays(120),
                        ShortDescription = "Create your own game in 48 hours",
                        Description =
                            "GameJam is a game development competition where participants create games from scratch in just 2 days.",
                        Venue = "Gaming Studio",
                        IsCanceled = false,
                        AppUser = users[0],
                        Type = types[0],
                        FundingAmount = 2000,
                        Status = EventStatus.Planned
                    }
                };

                var grants = new List<Event>
                {
                    new()
                    {
                        Title = "Research Grant for Renewable Energy",
                        Date = DateTime.Now.AddDays(-90),
                        ShortDescription = "Funding innovative projects in renewable energy",
                        Description =
                            "Apply for our research grant to support projects focused on advancing renewable energy solutions.",
                        Venue = "Research Institute",
                        IsCanceled = false,
                        AppUser = users[2],
                        Type = types[1],
                        FundingAmount = 10000,
                        Status = EventStatus.Finished
                    },
                    new()
                    {
                        Title = "Artistic Innovation Grant",
                        Date = DateTime.Now.AddDays(120),
                        ShortDescription = "Supporting creativity and innovation in the arts",
                        Description =
                            "Our grant program aims to fund artists and creators who are pushing boundaries in their craft.",
                        Venue = "Art Gallery",
                        IsCanceled = false,
                        AppUser = users[0],
                        Type = types[1],
                        FundingAmount = 5000,
                        Status = EventStatus.Active
                    },
                    new()
                    {
                        Title = "Community Development Grant",
                        Date = DateTime.Now.AddDays(150),
                        ShortDescription = "Empowering local communities",
                        Description =
                            "This grant is designed to support projects that make a positive impact on local communities.",
                        Venue = "Community Center",
                        IsCanceled = false,
                        AppUser = users[1],
                        Type = types[1],
                        FundingAmount = 8000,
                        Status = EventStatus.Active
                    }
                };

                context.Events.AddRange(accelerators);
                context.Events.AddRange(hackathons);
                context.Events.AddRange(grants);

                await context.SaveChangesAsync();
            }
        }
    }
}