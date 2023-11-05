using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
            public class Handler : IRequestHandler<Command, Result<Unit>>
            {
                private readonly DataContext context;
                private readonly IPhotoAccessor photoAccesor;
                private readonly IUserAccessor userAccessor;
                public Handler(DataContext context, IPhotoAccessor photoAccesor, IUserAccessor userAccessor)
                {
                    this.context = context;
                    this.photoAccesor = photoAccesor;
                    this.userAccessor = userAccessor;
                }

                public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
                {
                    var user = await context.Users.Include(p => p.Photos)
                        .FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUserName());
                    if (user is null)
                        return null;

                    var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                    if (photo is null)
                        return null;

                    if (photo.IsMain)
                        return Result<Unit>.Failure("You cannot delete your main photo!");

                    var result = await photoAccesor.DeletePhoto(photo.Id);

                    if (result is null)
                        return Result<Unit>.Failure("Problem deleting photo from cloudinary");

                    user.Photos.Remove(photo);

                    var success = await context.SaveChangesAsync() > 0;

                    if (success)
                        return Result<Unit>.Success(Unit.Value);

                    return Result<Unit>.Failure("Problem deleting photo from API");

                }
            }
        }
    }
}