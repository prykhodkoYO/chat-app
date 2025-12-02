import { BadRequestException } from '@nestjs/common';
import { memoryStorage } from 'multer';

export const multerAvatarOptions = {
  storage: memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
    const allowed = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!allowed.includes(file.mimetype)) {
      return cb(new BadRequestException('Only JPG/PNG images allowed'), false);
    }

    cb(null, true);
  },
};
