using InnoXCollab.Web.Data;
using InnoXCollab.Web.Models.Domain;

namespace InnoXCollab.Web.Repositories
{
    public class TagRepository : GenericRepository<Tag>
    {
        public TagRepository(InnoXCollabContext innoXCollabContext) : base(innoXCollabContext)
        {
            
        }

        public override async Task<Tag?> UpdateAsync(Tag obj)
        {
            var existingTag = await GetAsync(obj.Id, x => x.Events);

            if(existingTag != null)
            {
                ctx.Entry(existingTag).CurrentValues.SetValues(obj);
                existingTag.Events = obj.Events;
                await ctx.SaveChangesAsync();
                return existingTag;
            }

            return null;
        }
    }
}
