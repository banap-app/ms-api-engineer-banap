import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { CreateEngineerUseCase } from 'src/core/engineer/application/use-cases/create-engineer/create-engineer';
import {
  CreaEntity,
  EngineerEntity,
} from 'src/core/engineer/infrastructure/db/typeorm/engineer-entity';
import { EngineerTypeOrmRepository } from 'src/core/engineer/infrastructure/db/typeorm/engineer-typeorm-repository';
import { BcryptService } from 'src/core/engineer/infrastructure/services/bcrypt-service';
import { Repository } from 'typeorm';
import { EngineerController } from './engineer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EngineerEntity, CreaEntity])],
  controllers: [EngineerController],
  providers: [
    BcryptService,
    {
      provide: EngineerTypeOrmRepository,
      useFactory: (repo: Repository<EngineerEntity>) => {
        return new EngineerTypeOrmRepository(repo);
      },
      inject: [getRepositoryToken(EngineerEntity)],
    },
    {
      provide: CreateEngineerUseCase,
      useFactory: (repo: EngineerTypeOrmRepository, bcrypt: BcryptService) => {
        return new CreateEngineerUseCase(repo, bcrypt);
      },
      inject: [EngineerTypeOrmRepository, BcryptService],
    },
  ],
  exports: [EngineerTypeOrmRepository],
})
export class EngineerModule {}
