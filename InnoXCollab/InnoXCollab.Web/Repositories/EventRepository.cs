using InnoXCollab.Web.Data;
using InnoXCollab.Web.Models.Domain;
using InnoXCollab.Web.Models.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace InnoXCollab.Web.Repositories
{
	public class EventRepository : GenericRepository<Event>
	{

		public EventRepository(InnoXCollabContext innoXCollabContext) : base(innoXCollabContext)
		{
		}
		public override async Task<Event?> UpdateAsync(Event obj)
		{
			var existingEntity = await GetAsync(obj.Id, x => x.Tags);

			if (existingEntity != null)
			{
				ctx.Entry(existingEntity).CurrentValues.SetValues(obj);
				existingEntity.Tags = obj.Tags;
				existingEntity.Investor = obj.Investor;
                existingEntity.Type = obj.Type;
                await ctx.SaveChangesAsync();
				return existingEntity;
			}
			return null;
		}
	}
}
