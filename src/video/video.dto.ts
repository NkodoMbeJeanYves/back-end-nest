import { ClassSerializerInterceptor } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class VideoDTO {

    @ApiProperty()
    video_id: number;


    @ApiProperty()
    video_title: string;

    @ApiProperty()
    video_description: string;

    @ApiProperty()ApiProperty
    video_file_location: string;

}