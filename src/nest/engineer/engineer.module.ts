import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { AssociateProducerUseCase } from 'src/core/engineer/application/use-cases/associate-producer/associate-producer-use-case';
import { CreateEngineerUseCase } from 'src/core/engineer/application/use-cases/create-engineer/create-engineer';
import { DeleteEngineerUseCase } from 'src/core/engineer/application/use-cases/delete-engineer/delete-engineer';
import { GetEngineerUseCase } from 'src/core/engineer/application/use-cases/retrieve-engineer/get-engineer';
import { ValidateEngineerUseCase } from 'src/core/engineer/application/use-cases/retrieve-engineer/validate-engineer';
import { UpdateEngineerUseCase } from 'src/core/engineer/application/use-cases/update-engineer/update-engineer';
import {
  CreaEntity,
  EngineerEntity,
} from 'src/core/engineer/infrastructure/db/typeorm/engineer-entity';
import { EngineerTypeOrmRepository } from 'src/core/engineer/infrastructure/db/typeorm/engineer-typeorm-repository';
import { BcryptService } from 'src/core/engineer/infrastructure/services/bcrypt-service';
import { RabbitMQEventPublisher } from 'src/core/engineer/infrastructure/services/rabbitmq-event-publisher.ts';
import { NotificationEntity } from 'src/core/notification/infrastructure/db/typeorm/notification-entity';
import { NotificationTypeOrmRepository } from 'src/core/notification/infrastructure/db/typeorm/notification-typeorm-repository';
import { Repository } from 'typeorm';
import { RabbitMQModule } from '../common/rabbitmq/rabbitmq.module';
import { RabbitMQService } from '../common/rabbitmq/rabbitmq.service';
import { EngineerController } from './engineer.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([EngineerEntity, CreaEntity, NotificationEntity]),
    RabbitMQModule,
  ],
  controllers: [EngineerController],
  providers: [
    {
      provide: RabbitMQEventPublisher,
      useFactory: (rabbitMQService: RabbitMQService) => {
        return new RabbitMQEventPublisher(rabbitMQService);
      },
      inject: [RabbitMQService],
    },
    BcryptService,
    {
      provide: EngineerTypeOrmRepository,
      useFactory: (
        engineerRepo: Repository<EngineerEntity>,
        creaRepo: Repository<CreaEntity>,
      ) => {
        return new EngineerTypeOrmRepository(engineerRepo, creaRepo);
      },
      inject: [
        getRepositoryToken(EngineerEntity),
        getRepositoryToken(CreaEntity),
      ],
    },
    {
      provide: NotificationTypeOrmRepository,
      useFactory: (repo: Repository<NotificationEntity>) => {
        return new NotificationTypeOrmRepository(repo);
      },
      inject: [getRepositoryToken(NotificationEntity)],
    },
    {
      provide: CreateEngineerUseCase,
      useFactory: (repo: EngineerTypeOrmRepository, bcrypt: BcryptService) => {
        return new CreateEngineerUseCase(repo, bcrypt);
      },
      inject: [EngineerTypeOrmRepository, BcryptService],
    },
    {
      provide: GetEngineerUseCase,
      useFactory: (repo: EngineerTypeOrmRepository) => {
        return new GetEngineerUseCase(repo);
      },
      inject: [EngineerTypeOrmRepository],
    },
    {
      provide: ValidateEngineerUseCase,
      useFactory: (repo: EngineerTypeOrmRepository) => {
        return new ValidateEngineerUseCase(repo);
      },
      inject: [EngineerTypeOrmRepository],
    },
    {
      provide: UpdateEngineerUseCase,
      useFactory: (repo: EngineerTypeOrmRepository, bcrypt: BcryptService) => {
        return new UpdateEngineerUseCase(repo, bcrypt);
      },
      inject: [EngineerTypeOrmRepository, BcryptService],
    },
    {
      provide: DeleteEngineerUseCase,
      useFactory: (repo: EngineerTypeOrmRepository) => {
        return new DeleteEngineerUseCase(repo);
      },
      inject: [EngineerTypeOrmRepository],
    },
    {
      provide: AssociateProducerUseCase,
      useFactory: (
        engineerRepo: EngineerTypeOrmRepository,
        notificationRepo: NotificationTypeOrmRepository,
        eventPublisher: RabbitMQEventPublisher,
      ) => {
        return new AssociateProducerUseCase(
          engineerRepo,
          notificationRepo,
          eventPublisher,
        );
      },
      inject: [
        EngineerTypeOrmRepository,
        NotificationTypeOrmRepository,
        RabbitMQEventPublisher,
      ],
    },
  ],
  exports: [EngineerTypeOrmRepository],
})
export class EngineerModule {}
