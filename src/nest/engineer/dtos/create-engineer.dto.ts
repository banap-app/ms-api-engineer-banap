import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProfilePictureDto {
  @ApiProperty({ description: 'Original file name', example: 'profile.jpg' })
  @IsString()
  raw_name: string;

  @ApiProperty({ description: 'MIME type', example: 'image/jpeg' })
  @IsString()
  mime_type: string;

  @ApiProperty({ description: 'File size in bytes', example: 102400 })
  @IsNumber()
  size: number;
}

export class CreateEngineerDto {
  @ApiProperty({
    description: 'Full name',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password',
    example: 'Password123!',
  })
  @IsString()
  password: string;

  @ApiPropertyOptional({
    type: ProfilePictureDto,
    description: 'Profile picture',
  })
  @IsOptional()
  profilePicture?: ProfilePictureDto;

  @ApiProperty({
    description: 'CREA identification number',
    example: '123456-SP',
  })
  @IsString()
  crea: string;
}
