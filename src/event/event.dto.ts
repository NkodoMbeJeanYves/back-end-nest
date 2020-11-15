import { ApiProperty } from '@nestjs/swagger';

export class EventDTO {

    @ApiProperty()
    event_id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    file: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    password: string;

}