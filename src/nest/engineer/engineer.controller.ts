import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEngineerUseCase } from 'src/core/engineer/application/use-cases/create-engineer/create-engineer';
import { CreateEngineerCommand } from 'src/core/engineer/application/use-cases/create-engineer/create-engineer-command';
import { DeleteEngineerUseCase } from 'src/core/engineer/application/use-cases/delete-engineer/delete-engineer';
import { DeleteEngineerCommand } from 'src/core/engineer/application/use-cases/delete-engineer/delete-engineer-command';
import { UpdateEngineerUseCase } from 'src/core/engineer/application/use-cases/update-engineer/update-engineer';
import { UpdateEngineerCommand } from 'src/core/engineer/application/use-cases/update-engineer/update-engineer-command';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';
import {
  SwaggerCreateEngineer,
  SwaggerDeleteEngineer,
  SwaggerUpdateEngineer,
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

  @SwaggerUpdateEngineer()
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') id: string,
    @Body() updateEngineerDto: UpdateEngineerDto,
  ) {
    const command = new UpdateEngineerCommand({
      engineerId: id,
      ...updateEngineerDto,
    });
    return this.updateEngineerUseCase.execute(command);
  }

  @SwaggerDeleteEngineer()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const command = new DeleteEngineerCommand(id);
    return this.deleteEngineerUseCase.execute(command);
  }
}
