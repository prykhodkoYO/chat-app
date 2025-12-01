import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder: 'avatars' },
        (err, result: UploadApiResponse | undefined) => {
          if (err || !result) return reject(err);
          resolve(result.secure_url);
        }
      );
      upload.end(file.buffer);
    });
  }
}
