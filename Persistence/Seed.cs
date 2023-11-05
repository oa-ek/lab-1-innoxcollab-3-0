using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager
        // , RoleManager<IdentityRole> roleManager
        )
        {
            // if (!context.Roles.Any())
            // {
            //     string[] roleNames = { "Admin", "Moderator", "User" };
            //     foreach (var roleName in roleNames)
            //     {
            //         await roleManager.CreateAsync(new IdentityRole(roleName));
            //     }
            // }
            if (!context.Events.Any())
            {
                var investors = new List<Investor>
                {
                    new() {
                        Name = "PEPEGA INVESTMENT",
                        WebsiteUrl = "https://pepegainvestment.com"
                    },
                    new() {
                        Name = "George Soros",
                        WebsiteUrl = "https://georgesoros.com"
                    }
                };
                var users = new List<AppUser>
                {
                    new() {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com",

                    },
                    new() {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com",
                        Investor = investors[1]
                    },
                    new() {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com",
                        Investor = investors[0]
                    },
                };

                foreach (var user in users)
                {
                    var result = await userManager.CreateAsync(user, "Pa$$w0rd");
                    // await userManager.AddToRoleAsync(user, "User");
                    // if (result.Succeeded && user.UserName == "bob")
                    //     await userManager.AddToRoleAsync(user, "Admin");
                }

                var tags = new List<Tag>
                {
                    new() {
                        Name = "Online"
                    },
                    new() {
                        Name = "Offline"
                    },
                    new() {
                        Name = "IT"
                    }
                };

                await context.Tags.AddRangeAsync(tags);

                var accelerators = new List<Accelerator>
                {
                    new() {
                        Title = "Tech Startup Accelerator",
                        Date = DateTime.Now.AddDays(30),
                        ShortDescription = "Accelerate your tech startup",
                        Description = "Join our accelerator program and get access to mentorship, funding, and resources.",
                        Venue = "Tech Hub",
                        IsCanceled = false,
                        AppUser = users[0],
                        ProgramDuration = DateTime.Now.AddDays(60),
                        ProgramOffer = "Up to $50,000 funding available",
                        Tags = tags
                    },
                    new() {
                        Title = "Social Impact Accelerator",
                        Date = DateTime.Now.AddDays(45),
                        ShortDescription = "Driving positive change in the community",
                        Description = "Our accelerator focuses on startups making a social impact. Join us to make a difference.",
                        Venue = "Community Center",
                        IsCanceled = false,
                        AppUser = users[1],
                        ProgramDuration = DateTime.Now.AddDays(90),
                        ProgramOffer = "Mentorship and networking opportunities"
                    },
                    new() {
                        Title = "AI and Machine Learning Accelerator",
                        Date = DateTime.Now.AddDays(60),
                        ShortDescription = "Empowering AI-driven startups",
                        Description = "If you're working on cutting-edge AI or ML projects, our accelerator is the place for you.",
                        Venue = "Innovation Lab",
                        IsCanceled = false,
                        AppUser = users[2],
                        ProgramDuration = DateTime.Now.AddDays(120),
                        ProgramOffer = "Access to state-of-the-art AI technologies"
                    }
                };

                var hackathons = new List<Hackathon>
                {
                    new() {
                        Title = "CodeFest 2023",
                        Date = DateTime.Now.AddDays(60),
                        ShortDescription = "Join the ultimate coding challenge",
                        Description = "CodeFest is a 48-hour coding marathon where developers compete to build amazing projects.",
                        Venue = "Convention Center",
                        IsCanceled = false,
                        AppUser = users[1],
                        ChallengeStatement = "Create a web app that solves a real-world problem",
                        Prize = 3000
                    },
                    new() {
                        Title = "Hack4Good",
                        Date = DateTime.Now.AddDays(90),
                        ShortDescription = "Hacking for a better world",
                        Description = "Join us to use your hacking skills for positive social impact. Together, we can make a difference.",
                        Venue = "Co-working Space",
                        IsCanceled = false,
                        AppUser = users[2],
                        ChallengeStatement = "Develop a solution for sustainable agriculture",
                        Prize = 5000
                    },
                    new() {
                        Title = "GameJam 2023",
                        Date = DateTime.Now.AddDays(120),
                        ShortDescription = "Create your own game in 48 hours",
                        Description = "GameJam is a game development competition where participants create games from scratch in just 2 days.",
                        Venue = "Gaming Studio",
                        IsCanceled = false,
                        AppUser = users[0],
                        ChallengeStatement = "Design a game with a unique gameplay mechanic",
                        Prize = 2000
                    }
                };

                var grants = new List<Grant>
                {
                    new() {
                        Title = "Research Grant for Renewable Energy",
                        Date = DateTime.Now.AddDays(90),
                        ShortDescription = "Funding innovative projects in renewable energy",
                        Description = "Apply for our research grant to support projects focused on advancing renewable energy solutions.",
                        Venue = "Research Institute",
                        IsCanceled = false,
                        AppUser = users[2],
                        GrantAmount = 10000
                    },
                    new() {
                        Title = "Artistic Innovation Grant",
                        Date = DateTime.Now.AddDays(120),
                        ShortDescription = "Supporting creativity and innovation in the arts",
                        Description = "Our grant program aims to fund artists and creators who are pushing boundaries in their craft.",
                        Venue = "Art Gallery",
                        IsCanceled = false,
                        AppUser = users[0],
                        GrantAmount = 5000
                    },
                    new() {
                        Title = "Community Development Grant",
                        Date = DateTime.Now.AddDays(150),
                        ShortDescription = "Empowering local communities",
                        Description = "This grant is designed to support projects that make a positive impact on local communities.",
                        Venue = "Community Center",
                        IsCanceled = false,
                        AppUser = users[1],
                        GrantAmount = 8000
                    }
                };

                context.Accelerators.AddRange(accelerators);
                context.Hackathons.AddRange(hackathons);
                context.Grants.AddRange(grants);
                await context.SaveChangesAsync();
            }
        }
    }
}