import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoDTO } from './video.dto';
import { VideoEntity } from '../entity/video.entity';

@Injectable()
export class VideoService {

    constructor(
        // injection de la dépendance
        @InjectRepository(VideoEntity)
        private videoRepository: Repository<VideoEntity>
    ) {}

    // load all videos
    async fetchAll() {
        await this.videoRepository.find().then(
            (Data)  =>  {
                return {
                    data: Data
                }
            }
        );
    }

    // store video
    async store(data: VideoDTO) {
        const video = this.videoRepository.create(data);
        await this.videoRepository.save(data);
        return video;
    }


    public async upload(video_id: number, fileUrl: string){
        this.videoRepository.update(video_id, { video_file_location: fileUrl });
    }
}
