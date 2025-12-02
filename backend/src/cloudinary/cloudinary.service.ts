import { Inject, Injectable } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject('CLOUDINARY')
    private cloudinary: any,
  ) {}

  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const upload = this.cloudinary.uploader.upload_stream(
        { folder: 'avatars' },
        (err: any, result: UploadApiResponse | undefined) => {
          if (err || !result) return reject(err);
          resolve(result.secure_url);
        },
      );

      upload.end(file.buffer);
    });
  }
}
