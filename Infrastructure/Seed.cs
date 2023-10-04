using Domain;
namespace Infrastructure
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if(context.Events.Any()) return;

            var Events = new List<Event>{
                new Event{
                    Title = "Івент номер 1",
                    Date = DateTime.UtcNow.AddMonths(2),
                    Description = "Ну тут мало чого можна сказати"
                },
                new Event{
                    Title = "Івент номер 2",
                    Date = DateTime.UtcNow.AddMonths(5),
                    Description = "Поки що хай буде так"
                },
                new Event{
                    Title = "Івент номер 3",
                    Date = DateTime.UtcNow.AddMonths(3),
                    Description = "Останній Івент"
                }
            };

            await context.Events.AddRangeAsync(Events);

            await context.SaveChangesAsync();
        }
    }
}