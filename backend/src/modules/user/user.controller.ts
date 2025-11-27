import {
  Controller,
  Body,
  UseGuards,
  Req,
  Patch,
  UseInterceptors,
  Put,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private cloudinary: CloudinaryService,
  ) {}

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  updateProfile(@CurrentUser() user, @Body() dto: UpdateProfileDto) {
    return this.userService.updateProfile(user.id, dto);
  }
}
