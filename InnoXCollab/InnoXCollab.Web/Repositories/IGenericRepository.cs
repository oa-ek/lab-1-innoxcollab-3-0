using InnoXCollab.Web.Models.Domain;
using InnoXCollab.Web.Models.Domain.Interfaces;

namespace InnoXCollab.Web.Repositories
{
	public interface IGenericRepository<TEntity> where TEntity : class, IEntity<Guid>
	{
		public Task<IEnumerable<TEntity>> GetAllAsync();
		public Task<TEntity?> GetAsync(Guid id);
		public Task<TEntity> AddAsync(TEntity obj);
		public Task<TEntity?> UpdateAsync(TEntity obj);
		public Task<TEntity?> DeleteAsync(Guid id);
	}
}
