import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotAcceptableException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EventDTO } from './event.dto';
import { EventService } from './event.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

// match route => http://ourdomain.com/{event}
@Controller('event') // path
export class EventController {
  constructor(private eventService: EventService) {}

  @Post('upload/:event_id')
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
  uploadFile(@UploadedFile() file, @Param('event_id') event_id, @Body() data) {
    console.log(data);
    return this.eventService
      .upload(Number(event_id), `${file.path}.${file.extension}`)
      .then(
        (resolve) => {
          return {
            statusCode: HttpStatus.OK,
            message: 'Event stored successfully!',
            data: resolve,
            body: data,
          };
        },
        (reject) => {
          throw new NotAcceptableException('Unable to store that event.');
        },
      );
  }

  @Get()
  async fetchAll() {
    return this.eventService.fetchAll().then(
      (Data) => {
        return {
          data: Data,
          statusCode: HttpStatus.OK,
        };
      },
      (err) => {
        return {
          errors: err,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        };
      },
    );
  }

  @Post()
  async storeEvent(@Body() data: EventDTO) {
    return await this.eventService.store(data).then(
      (Data) => {
        return {
          data: Data,
          statusCode: HttpStatus.OK,
        };
      },
      (err) => {
        return {
          errors: err,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        };
      },
    );
  }

  @Get(':event_id')
  async find(@Param('event_id') event_id: number) {
    return await this.eventService.findById(event_id).then((event) => {
      if (!event) {
        throw new NotFoundException("Couln'd find event");
      } else
        return {
          statusCode: HttpStatus.OK,
          message: 'Event retrieved successfully!',
          data: event,
        };
    });
  }

  @Patch(':event_id')
  async updatePatch(
    @Param('event_id') event_id: number,
    @Body() data: Partial<EventDTO>,
  ) {
    return await this.eventService.update(event_id, data).then(
      (Data) => {
        return {
          data: Data,
          statusCode: HttpStatus.OK,
        };
      },
      (err) => {
        return {
          errors: err,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        };
      },
    );
  }

  @Put(':event_id')
  async updatePut(@Param() event_id: number, @Body() data: Partial<EventDTO>) {
    return await this.eventService.update(event_id, data).then(
      (Data) => {
        return {
          data: Data,
          statusCode: HttpStatus.OK,
        };
      },
      (err) => {
        return {
          errors: err,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        };
      },
    );
  }

  @Delete(':event_id')
  async delete(@Param() event_id: number) {
    return await this.eventService.destroy(event_id).then(
      (Data) => {
        return {
          data: Data,
          statusCode: HttpStatus.OK,
          message: 'item deleted successfully!',
        };
      },
      (err) => {
        return {
          errors: err,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'unable to delete item',
        };
      },
    );
  }

  @Get('builder/:id')
  async builder(@Param() event_id: number) {
    return this.eventService.queryBuilderMethods(event_id).then(
      (resolve) => {
        return { ...resolve };
      },
      (reject) => {
        return null;
      },
    );
  }
}
