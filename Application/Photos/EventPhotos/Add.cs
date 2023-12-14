using System.Diagnostics.CodeAnalysis;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Photos.EventPhotos;

public class Add
{
    public class Command : IRequest<Result<Photo>>
    {
        public Guid EventId { get; set; }
        public IFormFile File { get; set; }
    }

    [SuppressMessage("ReSharper", "MethodSupportsCancellation")]
    public class Handler : IRequestHandler<Command, Result<Photo>>
    {
        private readonly IPhotoAccessor photoAccessor;
        private readonly DataContext context;

        public Handler(IPhotoAccessor photoAccessor, DataContext context)
        {
            this.photoAccessor = photoAccessor;
            this.context = context;
        }

        public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
        {
            var @event = await context.Events.FindAsync(request.EventId);
            if (@event is null) return null;

            var photoUploadResult = await photoAccessor.AddPhoto(request.File);

            var photo = new Photo
            {
                Id = photoUploadResult.PublicId,
                Url = photoUploadResult.Url
            };

            // @event.RelatedPhoto = photo;

            var result = await context.SaveChangesAsync() > 0;

            return result
                ? Result<Photo>.Success(photo)
                : Result<Photo>.Failure("Failed to upload photo!");
        }
    }
}