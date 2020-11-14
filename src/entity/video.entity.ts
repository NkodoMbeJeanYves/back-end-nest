import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('videos')   // events is the tableName
export class VideoEntity {

    @PrimaryGeneratedColumn()
    video_id: number;
    
    @Column()
    video_title: string;

    @Column()
    video_description: string;

    @Column()
    video_file_location: string; 
}