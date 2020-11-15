import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as crypto from 'crypto';


@Entity('events')   // events is the tableName
export class EventEntity {

    @PrimaryGeneratedColumn()
    event_id: number;
    
    @Column()
    name: string;

    @Column()
    file: string;

    @Column()
    title: string; 
    
    @Column()
    description: string;

    @Column()
    email: string;

    @BeforeInsert()
    hashPassword() {
        this.password = crypto.createHmac('sha256', this.password).digest('hex');
    }

    @Column()
    password: string;
}