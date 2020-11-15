import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { EventDTO } from './event.dto';
import { EventEntity } from '../entity/event.entity';

@Injectable()
export class EventService {
private builder: any;
  constructor(
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>,
  ) {
      this.builder = getRepository(EventEntity).createQueryBuilder('events');
  }

  async fetchAll() {
    return await this.eventRepository.find().then((Data) => {
      return Data;
    });
  }

  public async upload(event_id: number, fileUrl: string) {
    return this.eventRepository.update(event_id, { file: fileUrl }).then(
      (resolve) => {
        return resolve;
      },
      (reject) => {
        return reject;
      },
    );
  }

  async store(data: EventDTO) {
    return await this.eventRepository.save(data).then(
      (resolve) => {
        return resolve;
      },
      (reject) => {
        return reject;
      },
    );
  }

  async findById(event_id: number) {
    return await this.eventRepository
      .findOne({
        where: {
          event_id: event_id,
        },
      })
      .then(
        (resolve) => {
          return resolve;
        },
        (reject) => {
          return reject;
        },
      );
  }

  async findByEmail(email: string) {
    return await this.eventRepository
      .findOne({
        where: {
          email: email,
        },
      })
      .then(
        (resolve) => {
          return resolve;
        },
        (reject) => {
          return reject;
        },
      );
  }

  async update(event_id: number, data: Partial<EventDTO>) {
    this.eventRepository.update({ event_id }, data);
    return await this.eventRepository.findOne({ event_id }).then(
      (resolve) => {
        return resolve;
      },
      (reject) => {
        return reject;
      },
    );
  }

  async destroy(event_id: number) {
    return await this.eventRepository.delete({ event_id }).then(
      (resolve) => {
        return resolve;
      },
      (reject) => {
        return reject;
      },
    );
  }

  async queryBuilderMethods(event_id: number) {
    const event = await this.builder
      .where('events.event_id = :event_id', { event_id: event_id })
      .Where('events.name = :name', { name: null})
      .getMany();
    return event;
  }
}
