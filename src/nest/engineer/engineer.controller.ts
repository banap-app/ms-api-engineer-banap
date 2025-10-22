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
import { EngineerOutput } from 'src/core/engineer/application/commons/engineer-output-mapper';
import { AssociateProducerCommand } from 'src/core/engineer/application/use-cases/associate-producer/associate-producer-command';
import { AssociateProducerUseCase } from 'src/core/engineer/application/use-cases/associate-producer/associate-producer-use-case';
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
import { ApiResponse } from 'src/core/shared/domain/response/api-response';
import { Public } from '../guards/auth/public.decorator';
import { AssociateProducerDto } from './dtos/associate-producter.dto';
import { CreateEngineerDto } from './dtos/create-engineer.dto';
import { UpdateEngineerDto } from './dtos/update-engineer.dto';
import {
  SwaggerAssociateProducer,
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
    private readonly associateProducerUseCase: AssociateProducerUseCase,
  ) {}

  @SwaggerCreateEngineer()
  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createEngineerDto: CreateEngineerDto,
  ): Promise<ApiResponse<EngineerOutput>> {
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

    const result = await this.createEngineerUseCase.execute(command);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Engineer created successfully',
      data: result,
    };
  }

  @SwaggerGetEngineer()
  @ApiSecurity('token')
  @Get()
  @HttpCode(HttpStatus.OK)
  async get(@Req() req): Promise<ApiResponse<EngineerOutput>> {
    const id = req.user.id;
    const command = new GetEngineerCommand(id);

    const result = await this.getEngineerUseCase.execute(command);

    return {
      statusCode: HttpStatus.OK,
      message: 'Engineer retrieved successfully',
      data: result,
    };
  }

  @SwaggerValidateEngineer()
  @ApiSecurity('token')
  @Get(':id/validate')
  @HttpCode(HttpStatus.OK)
  async validate(
    @Param('id') id: string,
  ): Promise<ApiResponse<{ exists: boolean }>> {
    const command = new GetEngineerCommand(id);
    const exists = await this.validateEngineerUseCase.execute(command);

    if (!exists) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Engineer not found',
        errors: [],
      });
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Validation result',
      data: { exists: true },
    };
  }

  @SwaggerUpdateEngineer()
  @ApiSecurity('token')
  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Req() req,
    @Body() updateEngineerDto: UpdateEngineerDto,
  ): Promise<void> {
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
    await this.updateEngineerUseCase.execute(command);
  }

  @SwaggerDeleteEngineer()
  @ApiSecurity('token')
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Req() req): Promise<void> {
    const id = req.user.id;
    const command = new DeleteEngineerCommand(id);
    await this.deleteEngineerUseCase.execute(command);
  }

  @SwaggerAssociateProducer()
  @ApiSecurity('token')
  @Post('associate-producer')
  @HttpCode(HttpStatus.NO_CONTENT)
  async inviteProducer(
    @Req() req,
    @Body() associateProducerDto: AssociateProducerDto,
  ): Promise<void> {
    const authToken = req.token;
    const senderId = req.user.id;
    const command = new AssociateProducerCommand(
      associateProducerDto.recipientEmail,
      senderId,
      authToken,
    );
    await this.associateProducerUseCase.execute(command);
  }
}
