﻿using Application.Interfaces;
using Application.Photos;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos
{
    public class PhotoAccessor : IPhotoAccessor
    {
        private readonly Cloudinary cloudinary;

        public PhotoAccessor(IOptions<CloudinarySettings> config)
        {
            var account = new Account
            (
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );

            cloudinary = new Cloudinary(account);
        }

        public async Task<PhotoUploadResult> AddPhoto(IFormFile file)
        {
            if (file.Length <= 0) return null;
            await using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream)
            };

            var uploadResult = await cloudinary.UploadAsync(uploadParams);

            if (uploadResult.Error is not null)
            {
                throw new Exception(uploadResult.Error.Message);
            }

            return new PhotoUploadResult
            {
                PublicId = uploadResult.PublicId,
                Url = uploadResult.SecureUrl.ToString()
            };
        }

        public async Task<string> DeletePhoto(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await cloudinary.DestroyAsync(deleteParams);
            return result.Result == "ok" ? result.Result : null;
        }
    }
}