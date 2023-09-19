using InnoXCollab.Web.Data;
using InnoXCollab.Web.Models.Domain;
using InnoXCollab.Web.Models.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace InnoXCollab.Web.Repositories
{
	public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class, IEntity<Guid>
	{
		private readonly InnoXCollabContext ctx;
		private readonly DbSet<TEntity> entities;

		public GenericRepository(InnoXCollabContext innoXCollabContext)
		{
			ctx = innoXCollabContext;
			entities = innoXCollabContext.Set<TEntity>();
		}

		public async Task<TEntity> AddAsync(TEntity obj)
		{
			await entities.AddAsync(obj);
			await ctx.SaveChangesAsync();
			return obj;
		}

		public async Task<TEntity?> DeleteAsync(Guid id)
		{
			var obj = await entities.FindAsync(id);
			// entities.Remove(x => x.Id == id); ????
			if (obj != null)
			{
				entities.Remove(obj);
				await ctx.SaveChangesAsync();
				return obj;
			}
			return null;
		}

		public async Task<IEnumerable<TEntity>> GetAllAsync()
		{
			return await entities.ToListAsync();
		}

		public async Task<TEntity?> GetAsync(Guid id)
		{
			return await entities.FirstOrDefaultAsync(x => x.Id == id);
		}
		public async Task<TEntity?> UpdateAsync(TEntity obj)
		{
			var existingEntity = await entities.FindAsync(obj.Id);

			if (existingEntity != null)
			{
				ctx.Entry(existingEntity).CurrentValues.SetValues(obj);
				await ctx.SaveChangesAsync();
				return existingEntity;
			}
			return null;
		}

		public async Task<IQueryable<TEntity>> IncludeAsync(params Expression<Func<TEntity, object>>[] includes)
		{
			IQueryable<TEntity> query = entities;

			foreach (var include in includes)
				query = query.Include(include);

			return query;
		}

	}
}
