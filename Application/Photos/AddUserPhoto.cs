using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class AddUserPhoto
    {
        public class Command : IRequest<Result<Photo>>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Photo>>
        {
            private readonly DataContext context;
            private readonly IPhotoAccessor photoAccessor;
            private readonly IUserAccessor userAccesor;

            public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccesor)
            {
                this.context = context;
                this.photoAccessor = photoAccessor;
                this.userAccesor = userAccesor;
            }

            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == userAccesor.GetUserName());

                if (user is null)
                    return null;

                var photoUploadResult = await photoAccessor.AddPhoto(request.File);

                var photo = new Photo
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };

                if (!user.Photos.Any(x => x.IsMain))
                    photo.IsMain = true;

                user.Photos.Add(photo);

                var result = await context.SaveChangesAsync() > 0;

                if (!result)
                    return Result<Photo>.Failure("Problem adding photo!");

                return Result<Photo>.Success(photo);
            }
        }
    }
}