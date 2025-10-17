import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class AssociateProducerDto {
  @ApiProperty({
    description: 'Email',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  recipientEmail: string;
}
