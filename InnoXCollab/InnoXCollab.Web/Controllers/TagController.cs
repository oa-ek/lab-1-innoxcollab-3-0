using InnoXCollab.Web.Data;
using InnoXCollab.Web.Models.Domain;
using InnoXCollab.Web.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace InnoXCollab.Web.Controllers
{
	public class TagController : Controller
	{
		private readonly IGenericRepository<Tag> repository;

		public TagController(IGenericRepository<Tag> repository)
        {
			this.repository = repository;
		}

		[HttpGet]
        public IActionResult Add()
		{
			return View();
		}

		[HttpPost]
		public async Task<IActionResult> Add(Tag tag)
		{
			if (tag != null)
			{
				await repository.AddAsync(tag);
				return RedirectToAction("Add");
			}
			return View();
		}
	}
}
