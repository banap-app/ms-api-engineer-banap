import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CreaEntity,
  EngineerEntity,
  ProfilePictureEntity,
  UserTypeEntity,
} from 'src/core/engineer/infrastructure/db/typeorm/engineer-entity';
import { AxiosModule } from './common/axios/axios.module';
import httpConfig from './config/httpConfig';
import { EngineerModule } from './engineer/engineer.module';
import { AuthGuard } from './guards/auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [httpConfig],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        EngineerEntity,
        CreaEntity,
        ProfilePictureEntity,
        UserTypeEntity,
      ],
      synchronize: false, // false in prod
    }),
    EngineerModule,
    AxiosModule,
  ],
  providers: [Reflector, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
