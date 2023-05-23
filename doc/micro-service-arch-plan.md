employee-management-system/
├── apps/
│   ├── employee-api/
│   │   ├── src/
│   │   │   ├── employees/
│   │   │   │   ├── employees.controller.ts
│   │   │   │   ├── employees.module.ts
│   │   │   │   ├── employees.service.ts
│   │   │   │   ├── dto/
│   │   │   │   │   ├── create-employee.dto.ts
│   │   │   │   │   ├── update-employee.dto.ts
│   │   │   │   │   ├── employee.dto.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── entities/
│   │   │   │   │   ├── employee.entity.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── repositories/
│   │   │   │   │   ├── employee.repository.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   └── package.json
│   └── employee-service/
│       ├── src/
│       │   ├── employees/
│       │   │   ├── employees.module.ts
│       │   │   ├── employees.service.ts
│       │   │   ├── dto/
│       │   │   │   ├── create-employee.dto.ts
│       │   │   │   ├── update-employee.dto.ts
│       │   │   │   ├── employee.dto.ts
│       │   │   │   └── index.ts
│       │   │   ├── entities/
│       │   │   │   ├── employee.entity.ts
│       │   │   │   └── index.ts
│       │   │   ├── repositories/
│       │   │   │   ├── employee.repository.ts
│       │   │   │   └── index.ts
│       │   │   └── index.ts
│       └── package.json
├── libs/
│   ├── common/
│   │   ├── src/
│   │   │   ├── constants/
│   │   │   │   ├── index.ts
│   │   │   │   └── messages.ts
│   │   │   ├── decorators/
│   │   │   │   └── user.decorator.ts
│   │   │   ├── enums/
│   │   │   │   └── roles.enum.ts
│   │   │   ├── guards/
│   │   │   │   ├── jwt-auth.guard.ts
│   │   │   │   └── roles.guard.ts
│   │   │   ├── interfaces/
│   │   │   │   ├── jwt-payload.interface.ts
│   │   │   │   └── user.interface.ts
│   │   │   ├── middleware/
│   │   │   │   └── logger.middleware.ts
│   │   │   └── utils/
│   │   │       ├── jwt.utils.ts
│   │   │       └── index.ts
│   │   ├── package.json
│   │   └── README.md
│   └── database/
│       ├── migrations/
│       │   ├── 1607918965423-CreateUserTable.ts
│       │   └── 160791896542


----------------------------------------------

src
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── common
│   ├── dto
│   │   ├── create-employee.dto.ts
│   │   ├── update-employee.dto.ts
│   │   └── index.ts
│   ├── filters
│   │   └── http-exception.filter.ts
│   ├── guards
│   │   └── auth.guard.ts
│   ├── interceptors
│   │   └── timeout.interceptor.ts
│   └── utils
│       ├── custom-validation.util.ts
│       └── logger.util.ts
├── employees
│   ├── employees.controller.ts
│   ├── employees.module.ts
│   ├── employees.service.ts
│   ├── interfaces
│   │   └── employee.interface.ts
│   └── schemas
│       └── employee.schema.ts
├── departments
│   ├── departments.controller.ts
│   ├── departments.module.ts
│   ├── departments.service.ts
│   ├── interfaces
│   │   └── department.interface.ts
│   └── schemas
│       └── department.schema.ts
├── notifications
│   ├── notifications.controller.ts
│   ├── notifications.module.ts
│   ├── notifications.service.ts
│   ├── interfaces
│   │   └── notification.interface.ts
│   └── schemas
│       └── notification.schema.ts
└── main.ts

-------------------------------------------------


src/
├── app.module.ts
├── common/
│   ├── dto/
│   │   ├── create-employee.dto.ts
│   │   ├── update-employee.dto.ts
│   │   ├── create-department.dto.ts
│   │   ├── update-department.dto.ts
│   │   ├── create-project.dto.ts
│   │   └── update-project.dto.ts
│   ├── enums/
│   │   ├── employee-status.enum.ts
│   │   ├── department-type.enum.ts
│   │   └── project-status.enum.ts
│   ├── exceptions/
│   │   ├── employee-not-found.exception.ts
│   │   ├── department-not-found.exception.ts
│   │   └── project-not-found.exception.ts
│   └── interfaces/
│       ├── employee.interface.ts
│       ├── department.interface.ts
│       └── project.interface.ts
├── employees/
│   ├── employees.controller.ts
│   ├── employees.module.ts
│   ├── employees.service.ts
│   ├── employee.entity.ts
│   ├── employees.repository.ts
│   └── employees.schema.ts
├── departments/
│   ├── departments.controller.ts
│   ├── departments.module.ts
│   ├── departments.service.ts
│   ├── department.entity.ts
│   ├── departments.repository.ts
│   └── departments.schema.ts
├── projects/
│   ├── projects.controller.ts
│   ├── projects.module.ts
│   ├── projects.service.ts
│   ├── project.entity.ts
│   ├── projects.repository.ts
│   └── projects.schema.ts
├── database/
│   ├── database.providers.ts
│   ├── database.module.ts
│   └── database.service.ts
└── main.ts

--------------------------------------------


src/
├── app.controller.ts
├── app.module.ts
├── common
│   ├── constants.ts
│   └── utils.ts
├── config
│   ├── app.config.ts
│   ├── database.config.ts
│   └── index.ts
├── core
│   ├── auth
│   │   ├── auth.module.ts
│   │   ├── guards
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── jwt.strategy.ts
│   │   └── services
│   │       ├── auth.service.ts
│   │       └── jwt.service.ts
│   ├── cache
│   │   ├── cache.module.ts
│   │   ├── redis-cache.service.ts
│   │   └── services
│   │       └── cache.service.ts
│   └── database
│       ├── database.module.ts
│       ├── entities
│       │   ├── employee.entity.ts
│       │   ├── leave.entity.ts
│       │   └── user.entity.ts
│       ├── migrations
│       ├── seeds
│       └── services
│           ├── employee.service.ts
│           ├── leave.service.ts
│           ├── database.service.ts
│           └── user.service.ts
└── modules
    ├── employee
    │   ├── employee.controller.ts
    │   ├── employee.dto.ts
    │   ├── employee.module.ts
    │   ├── employee.service.ts
    │   ├── interfaces
    │   │   └── employee.interface.ts
    │   └── validators
    │       ├── create-employee.validator.ts
    │       └── update-employee.validator.ts
    ├── leave
    │   ├── interfaces
    │   │   └── leave.interface.ts
    │   ├── leave.controller.ts
    │   ├── leave.dto.ts
    │   ├── leave.module.ts
    │   ├── leave.service.ts
    │   └── validators
    │       ├── create-leave.validator.ts
    │       └── update-leave.validator.ts
    └── user
        ├── interfaces
        │   └── user.interface.ts
        ├── user.controller.ts
        ├── user.dto.ts
        ├── user.module.ts
        ├── user.service.ts
        └── validators
            ├── create-user.validator.ts
            └── update-user.validator.ts


----------------------------------------------------------------

src/
├── app.controller.ts
├── app.module.ts
├── common
│   ├── constants.ts
│   └── utils.ts
├── config
│   ├── app.config.ts
│   ├── database.config.ts
│   └── index.ts
├── core
│   ├── auth
│   │   ├── auth.module.ts
│   │   ├── guards
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── jwt.strategy.ts
│   │   └── services
│   │       ├── auth.service.ts
│   │       └── jwt.service.ts
│   ├── cache
│   │   ├── cache.module.ts
│   │   ├── redis-cache.service.ts
│   │   └── services
│   │       └── cache.service.ts
│   ├── database
│   │   ├── database.module.ts
│   │   ├── entities
│   │   │   ├── cat.entity.ts
│   │   │   └── user.entity.ts
│   │   ├── migrations
│   │   └── services
│   │       ├── cat.service.ts
│   │       ├── database.service.ts
│   │       └── user.service.ts
│   └── logger
│       ├── logger.module.ts
│       ├── logger.service.ts
│       └── pino.logger.service.ts
├── modules
│   ├── cat
│   │   ├── cat.controller.ts
│   │   ├── cat.dto.ts
│   │   ├── cat.module.ts
│   │   ├── cat.service.ts
│   │   ├── interfaces
│   │   │   └── cat.interface.ts
│   │   ├── validators
│   │   │   ├── create-cat.validator.ts
│   │   │   └── update-cat.validator.ts
│   │   └── microservices
│   │       ├── cat-microservice.controller.ts
│   │       ├── cat-microservice.module.ts
│   │       └── cat-microservice.service.ts
│   └── user
│       ├── interfaces
│       │   └── user.interface.ts
│       ├── user.controller.ts
│       ├── user.dto.ts
│       ├── user.module.ts
│       ├── user.service.ts
│       ├── validators
│       │   ├── create-user.validator.ts
│       │   └── update-user.validator.ts
│       └── microservices
│           ├── user-microservice.controller.ts
│           ├── user-microservice.module.ts
│           └── user-microservice.service.ts
└── shared
    ├── dtos
    │   ├── cat.dto.ts
    │   └── user.dto.ts
    ├── grpc
    │   ├── grpc-client.service.ts
    │   ├── grpc.module.ts
    │   ├── proto
    │   │   ├── cat.proto
    │   │   └── user.proto
    │   ├── services
    │   │   ├── cat-grpc.service.ts
    │   │   └── user-grpc.service.ts
    │   └── types
    │       ├── cat.types.ts
    │       └── user.types.ts
    └── interfaces
        ├── grpc-options.interface.ts
        └── logger-options.interface.ts
