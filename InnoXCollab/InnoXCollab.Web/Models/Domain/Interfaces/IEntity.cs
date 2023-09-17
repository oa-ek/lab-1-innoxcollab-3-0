namespace InnoXCollab.Web.Models.Domain.Interfaces
{
    public interface IEntity<Tkey>
    {
        Tkey Id { get; set; }
    }
}
