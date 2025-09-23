import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEngineerDto {
  @ApiProperty({
    description: 'Full name',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Email',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Password',
    example: 'Password123!',
  })
  password: string;

  @ApiPropertyOptional({
    description: 'Profile picture URL',
    example: 'https://example.com/profile.jpg',
  })
  profilePicture?: string;

  @ApiProperty({
    description: 'CREA identification number',
    example: '123456-SP',
  })
  crea: string;
}
