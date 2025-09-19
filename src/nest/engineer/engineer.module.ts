import { Module } from '@nestjs/common';
import { EngineerController } from './engineer.controller';

@Module({
  controllers: [EngineerController],
})
export class EngineerModule {}
