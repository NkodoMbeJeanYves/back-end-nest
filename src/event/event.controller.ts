import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { EventDTO } from './event.dto';
import { EventService } from './event.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';


// match route => http://ourdomain.com/{event}
@Controller('api/event')    // path
export class EventController {

    constructor(private eventService: EventService) {

    }



    @Post('upload/:event_id')
    @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: './uploads', 
        filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        return cb(null, `${randomName}${extname(file.originalname)}`)
      }
      })
    }
    ))
    uploadFile(@UploadedFile() file, @Param('event_id') event_id) {
      console.log(file);
      this.eventService.upload(Number(event_id), `${file.path}.${file.extension}`);
    }

    @Get('')
    async fetchAll() {
        this.eventService.fetchAll().then(
            /* (Data)  =>  {
                return {
                    data: Data,
                    statusCode: HttpStatus.OK,
                    status: 200
                };
            },
            (err)   =>  {
                return {
                    errors: err,
                    statusCode: HttpStatus.OK,
                    status: 200
                };
            } */
        );
       
    }


    @Post()
    async storeEvent(@Body() data: EventDTO) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Event created successfully!',
            data: await this.eventService.store(data)
        };
    }


    @Get(':event_id')
    async find(@Param() event_id: number) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Event retrieved successfully!',
            data: await this.eventService.findById(event_id)
        };
    }

    @Patch(':event_id')
    async updatePatch(@Param() event_id: number, @Body() data: Partial<EventDTO>) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Event updated successfully!',
            data: await this.eventService.update(event_id, data)
        };
    }

    @Put(':event_id')
    async updatePut(@Param() event_id: number, @Body() data: Partial<EventDTO>) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Event updated successfully!',
            data: await this.eventService.update(event_id, data)
        };
    }


    @Delete(':event_id')
    async delete(@Param() event_id: number) {
        await this.eventService.destroy(event_id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Event deleted successfully'
        };
    }

}
