import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEngineerUseCase } from 'src/core/engineer/application/use-cases/create-engineer/create-engineer';
import { CreateEngineerCommand } from 'src/core/engineer/application/use-cases/create-engineer/create-engineer-command';
import { DeleteEngineerUseCase } from 'src/core/engineer/application/use-cases/delete-engineer/delete-engineer';
import { DeleteEngineerCommand } from 'src/core/engineer/application/use-cases/delete-engineer/delete-engineer-command';
import { UpdateEngineerUseCase } from 'src/core/engineer/application/use-cases/update-engineer/update-engineer';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import {
  SwaggerCreateEngineer,
  SwaggerDeleteEngineer,
} from './engineer.controller.interface';

@Controller('engineer')
export class EngineerController {
  constructor(
    private readonly createEngineerUseCase: CreateEngineerUseCase,
    private readonly deleteEngineerUseCase: DeleteEngineerUseCase,
    private readonly updateEngineerUseCase: UpdateEngineerUseCase,
  ) {}

  @SwaggerCreateEngineer()
  @Post()
  async create(@Body() createEngineerDto: CreateEngineerDto) {
    if (!createEngineerDto) {
      throw new BadRequestException('No data provided');
    }

    const command = new CreateEngineerCommand(createEngineerDto);
    return this.createEngineerUseCase.execute(command);
  }

  @Patch(':id')
  async update(@Param('id') id: string) {}

  @SwaggerDeleteEngineer()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const command = new DeleteEngineerCommand(id);
    return this.deleteEngineerUseCase.execute(command);
  }
}
