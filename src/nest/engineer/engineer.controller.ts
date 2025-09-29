import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
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
  SwaggerGetEngineer,
  SwaggerUpdateEngineer,
} from './engineer.controller.interface';
import { GetEngineerCommand } from 'src/core/engineer/application/use-cases/retrieve-engineer/get-engineer-command';
import { GetEngineerUseCase } from 'src/core/engineer/application/use-cases/retrieve-engineer/get-engineer';

@Controller('engineer')
export class EngineerController {
  constructor(
    private readonly createEngineerUseCase: CreateEngineerUseCase,
    private readonly deleteEngineerUseCase: DeleteEngineerUseCase,
    private readonly updateEngineerUseCase: UpdateEngineerUseCase,
    private readonly getEngineerUseCase: GetEngineerUseCase,
  ) {}

  @SwaggerCreateEngineer()
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createEngineerDto: CreateEngineerDto) {
    if (!createEngineerDto) {
      throw new BadRequestException('No data provided');
    }

    const command = new CreateEngineerCommand(createEngineerDto);
    return this.createEngineerUseCase.execute(command);
  }

  @SwaggerGetEngineer()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async get(@Param('id') id: string) {
    const command = new GetEngineerCommand(id);
    return this.getEngineerUseCase.execute(command);
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
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    const command = new DeleteEngineerCommand(id);
    return this.deleteEngineerUseCase.execute(command);
  }
}
