using InnoXCollab.Web.Data;
using InnoXCollab.Web.Models.Domain;
using InnoXCollab.Web.Models.Dto;
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

        [HttpGet]
        public async Task<IActionResult> List()
        {
			IEnumerable<Tag> tags = await repository.IncludeAsync(x => x.Events);
            return View(tags.ToList());
        }

        [HttpGet]
        public async Task<IActionResult> Edit(Guid id)
        {
			var tag = await repository.GetAsync(id);

			if(tag != null)
			{
				var model = new EditTagRequest
				{
					Id = tag.Id,
					Name = tag.Name,
					Events = tag.Events
				};

				return View(model);
			}

            return View(null);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(EditTagRequest editTagRequest)
        {
			var tag = new Tag
			{
				Id = editTagRequest.Id,
				Name = editTagRequest.Name,
				Events = editTagRequest.Events
			};

			var editedTag = await repository.UpdateAsync(tag);

			if (editedTag != null)
			{
                return RedirectToAction("List");
            }

			return RedirectToAction("Edit");
        }

        [HttpPost]
        public async Task<IActionResult> Delete(EditTagRequest editTagRequest)
        {
            var deletedTag = await repository.DeleteAsync(editTagRequest.Id);

            if (deletedTag != null)
            {
                return RedirectToAction("List");
            }

            return RedirectToAction("Edit");
        }
    }
}
