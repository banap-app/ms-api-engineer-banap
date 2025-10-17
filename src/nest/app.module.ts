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
import { NotificationEntity } from 'src/core/notification/infrastructure/db/typeorm/notification-entity';
import { AxiosModule } from './common/axios/axios.module';
import { RabbitMQModule } from './common/rabbitmq/rabbitmq.module';
import httpConfig from './config/http.config';
import rabbitmqConfig from './config/rabbitmq.config';
import { EngineerModule } from './engineer/engineer.module';
import { AuthGuard } from './guards/auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [httpConfig, rabbitmqConfig],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [
        EngineerEntity,
        CreaEntity,
        ProfilePictureEntity,
        UserTypeEntity,
        NotificationEntity,
      ],
      synchronize: false, // false in prod
    }),
    EngineerModule,
    AxiosModule,
    RabbitMQModule,
  ],
  providers: [Reflector, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
