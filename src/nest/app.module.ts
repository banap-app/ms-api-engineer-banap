import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CreaEntity,
  EngineerEntity,
  ProfilePictureEntity,
} from 'src/core/engineer/infrastructure/db/typeorm/engineer-entity';
import { EngineerModule } from './engineer/engineer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [EngineerEntity, CreaEntity, ProfilePictureEntity],
      synchronize: true,
    }),
    EngineerModule,
  ],
  providers: [Reflector],
})
export class AppModule {}
