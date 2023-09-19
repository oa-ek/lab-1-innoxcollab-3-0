using InnoXCollab.Web.Models.Domain;
using InnoXCollab.Web.Models.Domain.Interfaces;
using System.Linq.Expressions;

namespace InnoXCollab.Web.Repositories
{
	public interface IGenericRepository<TEntity> where TEntity : class, IEntity<Guid>
	{
		public Task<IEnumerable<TEntity>> GetAllAsync();
		public Task<TEntity?> GetAsync(Guid id);
		public Task<TEntity> AddAsync(TEntity obj);
		public Task<TEntity?> UpdateAsync(TEntity obj);
		public Task<TEntity?> DeleteAsync(Guid id);
		public Task<IQueryable<TEntity>> IncludeAsync(params Expression<Func<TEntity, object>>[] includes); 
	}
}
