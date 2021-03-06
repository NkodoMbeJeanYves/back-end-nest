import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotAcceptableException,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { VideoDTO } from './video.dto';
import { VideoService } from './video.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('videos')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file) {
    return {
      message: 'File uploaded successfully',
      file: file,
      statusCode: HttpStatus.OK,
    };
  }

  @Post('')
  async storeVideo(@Body() data: VideoDTO) {
    // wait for the promise to be resolve
    return this.videoService.store(data).then(
      (video) => {
        return {
          statusCode: HttpStatus.OK,
          message: 'Video stored successfully!',
          data: video,
        };
      },
      (reject) => {
        throw new NotAcceptableException('Unable to store that video.');
      },
    );
  }

  @Get('')
  async fetchAll() {
    // wait for the promise to be resolve
    return this.videoService.fetchAll().then(
      (Data) => {
        return {
          data: Data,
          statusCode: HttpStatus.OK,
          status: 200,
        };
      },
      (err) => {
        return {
          errors: err,
          statusCode: HttpStatus.OK,
          status: 200,
        };
      },
    );
  }
}
