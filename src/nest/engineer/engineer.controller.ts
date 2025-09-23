import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateEngineerUseCase } from 'src/core/engineer/application/use-cases/create-engineer';
import { CreateEngineerCommand } from 'src/core/engineer/application/use-cases/create-engineer-command';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { SwaggerCreateEngineer } from './engineer.controller.interface';

@Controller('engineer')
export class EngineerController {
  constructor(private readonly createEngineerUseCase: CreateEngineerUseCase) {}

  @SwaggerCreateEngineer()
  @Post()
  async create(@Body() createEngineerDto: CreateEngineerDto) {
    if (!createEngineerDto) {
      throw new BadRequestException('No data provided');
    }

    const command = new CreateEngineerCommand(createEngineerDto);
    return this.createEngineerUseCase.execute(command);
  }
}
