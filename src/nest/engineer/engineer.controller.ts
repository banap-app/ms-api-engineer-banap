import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { CreateEngineerUseCase } from 'src/core/engineer/application/use-cases/create-engineer/create-engineer';
import { CreateEngineerCommand } from 'src/core/engineer/application/use-cases/create-engineer/create-engineer-command';
import { DeleteEngineerUseCase } from 'src/core/engineer/application/use-cases/delete-engineer/delete-engineer';
import { DeleteEngineerCommand } from 'src/core/engineer/application/use-cases/delete-engineer/delete-engineer-command';
import { GetEngineerUseCase } from 'src/core/engineer/application/use-cases/retrieve-engineer/get-engineer';
import { GetEngineerCommand } from 'src/core/engineer/application/use-cases/retrieve-engineer/get-engineer-command';
import { ValidateEngineerUseCase } from 'src/core/engineer/application/use-cases/retrieve-engineer/validate-engineer';
import { UpdateEngineerUseCase } from 'src/core/engineer/application/use-cases/update-engineer/update-engineer';
import { UpdateEngineerCommand } from 'src/core/engineer/application/use-cases/update-engineer/update-engineer-command';
import { ProfilePicture } from 'src/core/engineer/domain/profile-picture-vo';
import { Public } from '../guards/auth/public.decorator';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';
import {
  SwaggerCreateEngineer,
  SwaggerDeleteEngineer,
  SwaggerGetEngineer,
  SwaggerUpdateEngineer,
  SwaggerValidateEngineer,
} from './engineer.controller.interface';

@Controller('engineer')
export class EngineerController {
  constructor(
    private readonly createEngineerUseCase: CreateEngineerUseCase,
    private readonly getEngineerUseCase: GetEngineerUseCase,
    private readonly validateEngineerUseCase: ValidateEngineerUseCase,
    private readonly updateEngineerUseCase: UpdateEngineerUseCase,
    private readonly deleteEngineerUseCase: DeleteEngineerUseCase,
  ) {}

  @SwaggerCreateEngineer()
  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createEngineerDto: CreateEngineerDto) {
    if (!createEngineerDto) {
      throw new BadRequestException('No data provided');
    }

    let profilePicture: ProfilePicture | undefined = undefined;

    if (createEngineerDto.profilePicture) {
      const [pp, ppError] = ProfilePicture.createFromFile(
        createEngineerDto.profilePicture,
      ).toTuple();

      if (ppError) {
        throw new BadRequestException(ppError.message);
      }

      profilePicture = pp;
    }

    const command = new CreateEngineerCommand({
      name: createEngineerDto.name,
      email: createEngineerDto.email,
      password: createEngineerDto.password,
      profilePicture,
      crea: createEngineerDto.crea,
    });
    return this.createEngineerUseCase.execute(command);
  }

  @SwaggerGetEngineer()
  @ApiSecurity('token')
  @Get()
  @HttpCode(HttpStatus.OK)
  async get(@Req() req) {
    const id = req.user.id;
    const command = new GetEngineerCommand(id);
    return this.getEngineerUseCase.execute(command);
  }

  @SwaggerValidateEngineer()
  @ApiSecurity('token')
  @Get(':id/validate')
  @HttpCode(HttpStatus.OK)
  async validate(@Param('id') id: string) {
    const command = new GetEngineerCommand(id);
    const exists = await this.validateEngineerUseCase.execute(command);

    if (!exists) {
      throw new NotFoundException({
        success: false,
      });
    }

    return {
      success: true,
    };
  }

  @SwaggerUpdateEngineer()
  @ApiSecurity('token')
  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Req() req, @Body() updateEngineerDto: UpdateEngineerDto) {
    const id = req.user.id;

    if (!updateEngineerDto) {
      throw new BadRequestException('No data provided');
    }

    let profilePicture: ProfilePicture | undefined = undefined;

    if (updateEngineerDto.profilePicture) {
      const [pp, ppError] = ProfilePicture.createFromFile(
        updateEngineerDto.profilePicture,
      ).toTuple();

      if (ppError) {
        throw new BadRequestException(ppError.message);
      }

      profilePicture = pp;
    }

    const command = new UpdateEngineerCommand({
      engineerId: id,
      name: updateEngineerDto.name,
      email: updateEngineerDto.email,
      profilePicture,
      crea: updateEngineerDto.crea,
    });
    return this.updateEngineerUseCase.execute(command);
  }

  @SwaggerDeleteEngineer()
  @ApiSecurity('token')
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Req() req) {
    const id = req.user.id;
    const command = new DeleteEngineerCommand(id);
    return this.deleteEngineerUseCase.execute(command);
  }
}
