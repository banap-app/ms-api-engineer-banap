import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';

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

export function SwaggerGetEngineer() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get engineer',
      description: 'Get a existing active user in the system',
    }),
    ApiResponse({
      status: 200,
      description: 'Engineer found',
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
      description: 'Bad request',
      schema: {
        example: {
          statusCode: 400,
          message: 'invalid UUID',
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Not found',
      schema: {
        example: {
          statusCode: 404,
          message: 'user not found',
        },
      },
    }),
  );
}

export function SwaggerValidateEngineer() {
  return applyDecorators(
    ApiOperation({
      summary: 'Validate engineer',
      description: 'Validate a existing active user in the system',
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'Engineer ID',
      required: true,
    }),
    ApiResponse({
      status: 200,
      example: {
        success: true,
      },
    }),
    ApiResponse({
      status: 404,
      example: {
        success: false,
      },
    }),
  );
}

export function SwaggerUpdateEngineer() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update engineer',
      description: 'Updates a existing active user in the system',
    }),
    ApiBody({
      description: 'Update engineer payload',
      type: UpdateEngineerDto,
    }),
    ApiResponse({
      status: 204,
      description: 'Engineer updated succesfully',
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
    ApiResponse({
      status: 404,
      description: 'Not found',
      schema: {
        example: {
          statusCode: 404,
          message: 'user not found',
        },
      },
    }),
  );
}

export function SwaggerDeleteEngineer() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete engineer',
      description: 'Soft deletes a engineer',
    }),
    ApiResponse({
      status: 204,
      description: 'Engineer deleted successfully',
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request',
      schema: {
        example: {
          statusCode: 400,
          message: 'invalid UUID',
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Not found',
      schema: {
        example: {
          statusCode: 404,
          message: 'user not found',
        },
      },
    }),
  );
}
