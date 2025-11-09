# Engineer API - BANAP

A microservice for managing engineer profiles in the BANAP platform, built with NestJS, TypeORM, and following Clean Architecture principles.

## Features

- [x] Engineer registration
- [x] Profile management
- [ ] Invitation system via RabbitMQ (WIP)

##

```
src/
├── core/                          # Domain & Application Layer
│   ├── engineer/
│   │   ├── domain/               # Domain entities, value objects, repositories
│   │   ├── application/          # Use cases, DTOs, output mappers
│   │   └── infrastructure/       # Repository implementations, external services
│   ├── notification/
│   └── shared/                   # Shared domain concepts
└── nest/                         # Infrastructure & Presentation Layer
    ├── engineer/                 # Controllers, NestJS modules
    ├── common/                   # Shared infrastructure (Axios, RabbitMQ)
    ├── filters/                  # Exception filters
    └── guards/                   # Authentication guards
```

## Tech Stack

- TypeScript
- NestJS
- TypeORM
- PostgreSQL

## Setup

1. Clone the repository
2. Install dependencies: `npm ci`
3. Configure environment variables
4. Start the development server: `npm run start:dev`

## Environment Variables
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASS=your_password
DB_NAME=banap_database
HTTP_BASE_URL=http://localhost:8192
PRODUCER_BASE_URL=http://localhost:3000
RABBITMQ_URL: amqp://banap:banap@localhost:5672
```

