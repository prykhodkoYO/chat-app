import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [ConfigModule],
  providers: [
    CloudinaryService,
    {
      provide: 'CLOUDINARY',
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const cloud_name = cfg.get<string>('CLOUDINARY_CLOUD_NAME');
        const api_key = cfg.get<string>('CLOUDINARY_API_KEY');
        const api_secret = cfg.get<string>('CLOUDINARY_API_SECRET');

        console.log('CLOUDINARY CONFIG:', { cloud_name, api_key, api_secret });

        cloudinary.config({
          cloud_name,
          api_key,
          api_secret,
        });

        return cloudinary;
      },
    },
  ],
  exports: ['CLOUDINARY', CloudinaryService],
})
export class CloudinaryModule {}
