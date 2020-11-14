import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventDTO } from './event.dto';
import { EventEntity } from '../entity/event.entity';

@Injectable()
export class EventService {

    constructor(
        @InjectRepository(EventEntity)
        private eventRepository: Repository<EventEntity>
    ) {}

    async fetchAll() {
        await this.eventRepository.find().then(
            (Data)  =>  {
                return {
                    data: Data
                }
            }
        );
    }


    public async upload(event_id: number, fileUrl: string){
        this.eventRepository.update(event_id, {file: fileUrl });
    }



    async store(data: EventDTO) {
        const event = this.eventRepository.create(data);
        await this.eventRepository.save(data);
        return event;
    }

    async findById(event_id: number) {
        return await this.eventRepository.findOne({
            where: {
                event_id: event_id
            },
        });
    }


    async findByEmail(email: string) {
        return await this.eventRepository.findOne({
            where: {
                email: email
            },
        });
    }


    async update(event_id: number, data: Partial<EventDTO>) {
        await this.eventRepository.update({event_id},
            data);
        return await this.eventRepository.findOne({event_id});
    }


    async destroy(event_id: number) {
        await this.eventRepository.delete({event_id});
        return {deleted: true};
    }


    


}
