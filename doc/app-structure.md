src/
├── app.module.ts
├── common
│ ├── constants/
| | └── constants.ts|
│ ├── Utility
│ | ├── utils.ts
│ | ├── email/
│ | └── sms/
│ ├── decorators/
│ ├── exceptions/
│ ├── filters/
│ ├── interceptors/
│ ├── interfaces/
│ └── pipes/
├── config
│ ├── app.config.ts
│ ├── database.config.ts
│ └── index.ts
├── core
│ ├── auth
│ │ ├── auth.module.ts
│ │ ├── guards
│ │ │ ├── jwt-auth.guard.ts
│ │ │ └── roles.guard.ts
│ │ ├── jwt.strategy.ts
│ │ └── services
│ │ ├── auth.service.ts
│ │ └── jwt.service.ts
│ ├── cache
│ │ ├── cache.module.ts
│ │ ├── redis-cache.service.ts
│ │ └── services
│ │ └── cache.service.ts
│ └── database
│ | ├── database.module.ts
│ | ├── entities
│ | │ ├── cat.entity.ts
│ | │ └── user.entity.ts
│ | ├── migrations
│ | └── services
│ | ├── cat.service.ts
│ | ├── database.service.ts
│ | └── user.service.ts
│ └── logger
│ │ ├── logger.module.ts
│ │ ├── logger.service.ts
│ │ └── pino.logger.service.ts
├── modules
│ ├── company/
│ │ ├── company.module.ts
│ │ ├── controllers/
│ │ ├── dto/
│ │ ├── entities/
│ │ ├── interfaces/
│ │ ├── repositories/
│ │ ├── services/
│ │ └── validators/
│ ├── department/
│ │ ├── department.module.ts
│ │ ├── controllers/
│ │ ├── dto/
│ │ ├── entities/
│ │ ├── interfaces/
│ │ ├── repositories/
│ │ ├── services/
│ │ └── validators/
│ ├── employee/
│ │ ├── employee.module.ts
│ │ ├── controllers/
│ │ ├── dto/
│ │ ├── entities/
│ │ ├── interfaces/
│ │ ├── repositories/
│ │ ├── services/
│ │ └── validators/
└── main.ts
---

v2

---

src/
├── app.module.ts
├── auth/
│ ├── auth.module.ts
│ ├── dto/
│ ├── guards/
│ ├── interfaces/
│ ├── jwt.strategy.ts
│ └── services/
├── common/
│ ├── constants/
│ ├── decorators/
│ ├── exceptions/
│ ├── middlewares/
│ ├── filters/
│ ├── interceptors/
│ ├── interfaces/
│ └── pipes/
├── company/
│ ├── company.module.ts
│ ├── controllers/
│ ├── dto/
│ ├── entities/
│ ├── interfaces/
│ ├── repositories/
│ ├── services/
│ └── validators/
├── department/
│ ├── department.module.ts
│ ├── controllers/
│ ├── dto/
│ ├── entities/
│ ├── interfaces/
│ │    └── department.interface.ts
│ ├── repositories/
│ ├── services/
│ └── validators/
│      ├── create-department.validator.ts
│      └── update-department.validator.ts
├── employee/
│ ├── employee.module.ts
│ ├── controllers/
│ ├── dto/
│ ├── entities/
│ ├── interfaces/
│ ├── repositories/
│ ├── services/
│ └── validators/
├── infrastructure/
│ ├── database/
│ ├── email/
│ └── sms/
└── main.ts
