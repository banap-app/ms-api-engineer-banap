import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ProfilePictureDto } from './create-engineer.dto';

export class UpdateEngineerDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    type: ProfilePictureDto,
    description: 'Profile picture',
  })
  @IsOptional()
  profilePicture?: ProfilePictureDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  crea?: string;
}
