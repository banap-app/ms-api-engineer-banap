import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateEngineerDto } from './dto/create-engineer.dto';

export function SwaggerCreateEngineer() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create engineer',
      description: 'Register a new engineer in the system',
    }),
    ApiBody({
      description: 'Engineer payload',
      type: CreateEngineerDto,
    }),
    ApiResponse({
      status: 201,
      description: 'Engineer created successfully',
      schema: {
        example: {
          id: '8815433c-1eaa-448d-a6ed-de9635099fd2',
          name: 'John Doe',
          email: 'john.doe@example.com',
          profilePicture: 'https://example.com/profile.jpg',
          crea: '123456-SP',
          userType: 1,
          isActive: true,
          createdAt: '2025-10-01T12:00:00Z',
          updatedAt: '2025-10-01T12:00:00Z',
          deletedAt: null,
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Validation error',
      schema: {
        example: {
          message: 'Entity Validation Error',
          errors: [
            {
              name: ['name should not be empty'],
            },
            {
              email: ['email already in use'],
            },
            {
              password: ['invalid password'],
            },
            {
              crea: ['crea already registered'],
            },
          ],
        },
      },
    }),
  );
}
