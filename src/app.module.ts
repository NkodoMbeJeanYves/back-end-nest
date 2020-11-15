import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        "type": "mysql",
        "host": "localhost",
         port: 3306,
        "username": "root",
        "password": "",
        "database": "nestjs",
        "synchronize": false,
        "logging": true,
        "entities": ["src/**/*.entity.ts", "dist/**/*entity.ts"]
      }
    ),
    EventModule,
    VideoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
