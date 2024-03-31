---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Autenticación en Nest js con Passport y JWT
date: 11-02-2024
author: Mauricio Jourdán
image:
  { src: '/astro-doc-full-stack/images/nest-js/back.webp', alt: Logo nest js' }
icon:
  { src: '/astro-doc-full-stack/images/nest-js/icon.png', alt: 'Logo Nest js' }
description: Autenticación en Nest js con Passport y JWT
draft: false
category: Nest js backend
---

## Nest Js

- Documentación: https://nestjs.com/
- Repositorio del proyecto: https://github.com/jourdanmauricio/nest-ecommerce
- Branch authentication: git clone -b authentication https://github.com/jourdanmauricio/nest-ecommerce

## Introducción a Guards

<details>
<summary>Detalle</summary>

<mark>Los guards (guardianes) son artefactos proporcionados por Nest.js que nos permiten proteger nuestros Endpoints en los controladores, verificando si un usuario tiene los permisos necesarios para acceder a un Endpoint en función de una condición.</mark>

Esto se puede lograr validando datos en los encabezados (headers), el estado, un token, etc., y determinando si el usuario tiene los permisos necesarios o no.

### Creando la capa de autenticación

Crearemos un nuevo módulo para que administre la atenticación y un primer guardian.

```bash
nest g mo auth
nest g gu auth/guards/api-key --flat
```

```ts
// api-key.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Si retornamos true, se permite el acceso al Endpoint
    return false;
  }
}
```

Ahora, veamos cómo podemos implementar este guardián. Vamos a seleccionar un controlador y un Endpoint específico, y lo protegeremos con nuestro guardián:

```ts
// app-controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard } from './auth/guards/api-key.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Utilziamos el guardian el la ruta http://localhost:3000/health
  @Get('health')
  @UseGuards(ApiKeyGuard)
  getHealth(): string {
    return 'Server working correctly';
  }
}
```

De esta manera, **no será posible acceder al Endpoint**, ya que en el guardián estamos retornando **false**, lo cual deniega el acceso.

![Guardian, protege endpoint.](/astro-doc-full-stack/images/nest-js/guard.webp)

Podemos permitir el acceso se envía un encabezado específico, en nuestro proyecto utililizaremos un atributo llamado **Auth** en el **header de la petición**. Veamos cómo hacerlo en nuestro guardián:

```ts
// api-key.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    // Obtenemos el encabezado 'Auth' de ese request
    const authHeader = request.header('Auth');

    const isAuth = authHeader === 'password ultra secreto';

    if (!isAuth) throw new UnauthorizedException('no allow');

    return isAuth;
  }
}
```

Si enviamos la clave correcta (password ultra secreto) en el encabezado 'Auth', se nos permitirá el acceso; de lo contrario, recibiremos un código 403, que indica que no estamos autorizados.

![Guardian, access to endpoint.](/astro-doc-full-stack/images/nest-js/guard2.webp)

De esta manera, podemos utilizar los guardián en Nest.js. Como has visto, los guardián se basan en un contexto que nos permite acceder a la información necesaria y podemos programar la condición que debe cumplir esta información obtenida a través del contexto.

</details>

## Usando un decorador

<details>
<summary>Detalle</summary>

Una funcionalidad muy útil a la hora de trabajar con nuestros guardianes es que en vez de nosotros tener que programar cual es la condición que debe cumplir el contexto que necesitamos, lo que podemos hacer es usar decoradores que validen esta información por nosotros:

Para nuestro ejemplo, lo que vamos a hacer es que vamos a proteger todos los Endpoints de nuestro controlador, pero permitir el acceso a uno de ellos señalándolo como público.

La forma en la que vamos a utilizar este metadato que estamos enviando al contexto del guardián, en este caso va a ser para que con esa configuración protejamos todos los Endpoints del controlador, menos, el Endpoint que tenga el metadato **‘isPiblic’** en **true**.

```ts
// app.controller.ts
import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard } from './auth/guards/api-key.guard';

// para que todos los enpoints de el controlador esten protegidos
// colocamos el decodador arriba del controlador
@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // SetMetadata nos permite enviar metadatos
  // que podemos recibir en el contexto del guardian
  @Get()
  @SetMetadata('isPublic', true)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  @UseGuards(ApiKeyGuard)
  getHealth(): string {
    return 'Server working correctly';
  }
}
```

De esta forma, si un parámetro tiene en sus metadatos que es publico, no se realizará la validación, pero si en sus metadatos no lo tienen, re debe realizar la validación.

### Creando nuestros decoradores con metadatos

El crear nuestros propios decoradores con la metadata que necesitamos es útil para que no caigamos en errores de Typos, y también tanto para agilizar la experiencia de desarrollo, como hacer el código mucho más verboso.

Para realizar esto, vamos a crear este decorador de la siguiente forma:

```ts
// src\auth\decorators\public.decorator.ts

import { SetMetadata } from '@nestjs/common';

// instanciamos como queremos que se va a llamar la metadata
// lo exportamos por si lo queremos reutilizar en otro decodador y en el guardian
export const IS_PUBLIC_KEY = 'isPublic';

// creamos el decorador primero como una función flecha
// va a ser igual al decodador "SetMetadata", pero con el metadato "isPublic" como "true"
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
```

```ts
// api-key.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const isPublic = this.reflector.get('isPublic', context.getHandler());
    if (isPublic) {
      // no hacemos validación
      return true;
    }

    // Obtenemos el encabezado 'Auth' de ese request
    const authHeader = request.header('Auth');

    const isAuth = authHeader === 'password ultra secreto';

    if (!isAuth) throw new UnauthorizedException('no allow');

    return isAuth;
  }
}
```

Y ahora solo tendríamos que usar este decorador de la siguiente forma:

```ts
// app.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard } from './auth/guards/api-key.guard';
import { Public } from './auth/decorators/public.decorator';

// para que todos los enpoints de el controlador esten protegidos
// colocamos el decodador arriba del controlador
@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // SetMetadata nos permite enviar metadatos
  // que podemos recibir en el contexto del guardian
  @Get()
  // @UseGuards(ApiKeyGuard)
  // @SetMetadata('isPublic', true)
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth(): string {
    return 'Server working correctly';
  }
}
```

Y listo, ahora tenemos un decorador un poco más flexible y personalizado.

</details>

## Guard con variables de ambiente

<details>
<summary>Detalle</summary>

Ahora, lo que vamos a hacer es que la clave de autenticación la vamos a guardar en una variable de ambiente, con esto no tenemos esta clave harcodeada en nuestro guardián, y podemos hacer que esta sea dinámica. Reutilizaremos la variable de entorno API_KEY. Veamos como:

```ts
// api-key.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const isPublic = this.reflector.get('isPublic', context.getHandler());
    if (isPublic) {
      // no hacemos validación
      return true;
    }

    // Obtenemos el encabezado 'Auth' de ese request
    const authHeader = request.header('Auth');

    const isAuth = authHeader === this.configService.apiKey;

    if (!isAuth) throw new UnauthorizedException('no allow');

    return isAuth;
  }
}
```

También debemos modificar la validación para la variable de ambiente API_KEY en app.module.ts ya que antes esperábamos un number y ahora lo transformamos en string.

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import axios from 'axios';
import * as Joi from 'joi';

import { ConfigModule } from '@nestjs/config';
import { environments } from './environments';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DatabseModule } from './database/databse.module';
import { AuthModule } from './auth/auth.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        // DB Postgres
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
      }),
    }),
    ProductsModule,
    UsersModule,
    HttpModule,
    DatabseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async () => {
        const response = await axios({
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/todos',
        });
        return response.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
```

> Recuerda modificar los .env de los tres ambientes con el valor de la API_KEY que desees.

</details>

## Hashing de contraseñas en TypeORM

<details>
<summary>Detalle</summary>

Hashing de contraseñas significa ofuscar las passworsds de nuestros usuarios en la base de datos. No podemos almacenar la contraseña de los usuarios como un string, se debe encriptar.

Ni siquiera el administrador de la base de datos conocerá el password. No se puede desencriptar un password. Cuando el usuario realiza el login se compara el hash de la contaseña que envía con el que se encuentra almacenado en la base de datos.

Modificaremos el servicio users para encriptar la contraseña antes de crear el usuario. Y agregaremos un nuevo método para buscar un usuario por email. Posteriormente, utilizaremos éste método y como lo utilizaremos desde otros módulos debemos exportar el user.service en user.module.ts.

También agregaremos el decorador @Exclude a la entiadad User para exluir el atributo password de cualquier response.

```bash
npm i bcrypt
npm i -D @types/bcrypt
```

```ts
// user.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  // Excluimos el password
  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  role: string;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @CreateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
```

```ts
// users.service.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Client } from 'pg';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { ProductsService } from './../../products/services/products.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { CustomersService } from './customers.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private configService: ConfigService,
    private productsService: ProductsService,
    @Inject('PG') private clientPg: Client,
    private customersService: CustomersService
  ) {}

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log('apiKey', apiKey);
    console.log('atabaseName', dbName);
    return this.userRepo.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  // hash password
  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    const hashPass = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPass;
    if (data.customerId) {
      const customer = await this.customersService.findOne(data.customerId);
      newUser.customer = customer;
    }
    return this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.findOne(id);
    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }

  async getOrdersByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) reject(err);
        resolve(res.rows);
      });
    });
  }
}
```

```ts
// users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { Customer } from './entities/customer.entity';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { ProductsModule } from './../products/products.module';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { OrderItemsService } from './services/order-items.service';
import { OrderItemsController } from './controllers/order-items.controller';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Customer, Order, OrderItem]),
  ],
  controllers: [
    UsersController,
    CustomersController,
    OrdersController,
    OrderItemsController,
  ],
  providers: [UsersService, CustomersService, OrdersService, OrderItemsService],
  exports: [UsersService],
})
export class UsersModule {}
```

</details>

## Autenticación con Passport.js

<details>
<summary>Detalle</summary>

La documentación de Nest js recomienda realizar la autenticación mediante la librería passport. Posee un módulo especial para la librería.

```bash
npm install --save @nestjs/passport passport passport-local
npm install --save-dev @types/passport-local
```

Una vez instaladas las librerías mencionadas crearemos un servicio dentro del módulo auth, que se ocupará del login y register.

```bash
nest g s auth/services/auth --flat
```

```ts
// auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from 'src/users/users.module';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
```

Creamos la carpeta strategies dentro auth.

```ts
// src/auth/strategies/local.strategy.ts
import { AuthService } from './../services/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);

    if (!user) throw new UnauthorizedException('unauthorized');
    return user;
  }
}
```

```ts
// auth.service.ts
import { UsersService } from './../../users/services/users.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      return user;
    }
    return null;
  }
}
```

</details>

## Ruta de login

<details>
<summary>Detalle</summary>

Una vez creado el servicio para la autenticación crearemos un controlador para realizar el login.

```bash
nest g co auth/controllers/auth --flat
```

Moficaremos el naming de las variables de login por defecto es username y password indicádolo en la estrategy.

```ts
// local.strategy.ts
import { AuthService } from './../services/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    // Moficamos el naming de las variables de login
    // por defecto es username y password
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);

    if (!user) throw new UnauthorizedException('unauthorized');
    return user;
  }
}
```

```ts
// auth.controller.ts
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  // Utilizaremos el Request desde Express y mediante el decorador useGuards
  // realizamos ejecutamos la lógica de la estragia local
  // Si pasa las validaciones obtendremos el el request el user autenticado
  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req: Request) {
    return req.user;
  }
}
```

Desde Insomnia ya podemos crear un customer, con el id del customer creado, crear un user y finalmente realizar el login al enpoint http://localhost:3000/auth/login

> No podemos reutilizar usuarios creados con anterioridad porque ahora el password se encuentra encriptado.

![Crear Customer.](/astro-doc-full-stack/images/nest-js/create-customer2.webp)
![Crear User.](/astro-doc-full-stack/images/nest-js/create-user2.webp)
![Login.](/astro-doc-full-stack/images/nest-js/login2.webp)

Si intentamos loguearnos con un email o password incorrecto obtendremos un error de tipo 401.

![Unauthorized.](/astro-doc-full-stack/images/nest-js/unauthorized2.webp)

</details>

## Conectando Passport con JWT

<details>
<summary>Detalle</summary>

Los JWT nos permiten tener la certeza que un usuario se a logueado en la aplicación de manera satisfactoria, validando en nuestra base de datos y si el usuario es correcto, este token actúa como sesión que permite entrar a los Endpoints que deseamos, y con este token le damos permisos al usuario para hacer request.

- Los JWT también sirven en aplicaciones móviles. Las cookies o sesiones solo corren en navegadores, pero los JWT se pueden utilizar en aplicaciones nativas de Andorid y IOS.

Nest.js también tiene un paquete para manejar los JWT, veamos que dependencias debemos instalar para manejar JWT con Nest y Passport. Crearemos una nueva estrategía basada en JWT.

```bash
npm install --save @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt
```

Unavez que el usuario se loguea generaremos un token, para que el usuario lo envíe en los siguientes requests, y no tenga que realizar el login nuevamente.

Generalmente, en el token enviamos el id del user y algún otro dato. No debemos enviar información sensible.

Es buena práctica tipar la información que se envía en el payload del token, por lo que generaremos una interface para ello.

```ts
// src/auth/models/token.model.ts
export interface PayloadToken {
  role: string;
  sub: number;
}
```

```ts
// auth.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from './../../users/services/users.service';
import { User } from 'src/users/entities/user.entity';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      return user;
    }
    return null;
  }

  // En el token enviaremos el role y el id.
  // Es buena práctica utilizar el naming sub para el id
  // Ante el login, retornaremos el user y el token
  // Es buena práctica tipar el payload
  generateJWT(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
```

<mark>Aún con estos cambios el la generación del Token no funcinará porque falta indicar con qué llave secreta se firmará el Token. </mark>

</details>

## Secret desde variables de entorno

<details>
<summary>Detalle</summary>

Tanto para generar el token como para validarlo, JWT requiere de un sercret. Debemos ser muy cuidados con el secret, solo debe recidir en el servidor como una variable de ambiente.

Una forma de generar un secreto (en terminal linux) es a tarvés del comando:

```bash
date +%s | sha256sum | base64 | head -c 32 ; echo
# ZjhjYWY0MjA1ZTI5ODE1M2IxZmQzYjBh
```

```ts
// auth.module.ts
import { ConfigType } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from 'src/users/users.module';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import config from 'src/config';

// Como ejemplo generamos los tokens con 10 días de vencimiento
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: { expiresIn: '10d' },
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
```

```bash
# .env
JWT_SECRET='ZjhjYWY0MjA1ZTI5ODE1M2IxZmQzYjBh'
```

```ts
// src/config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    postgres: {
      dbHost: process.env.POSTGRES_HOST,
      dbPort: parseInt(process.env.POSTGRES_PORT, 10),
      dbName: process.env.POSTGRES_DB,
      dbUser: process.env.POSTGRES_USER,
      dbPass: process.env.POSTGRES_PASSWORD,
    },
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
  };
});
```

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import axios from 'axios';
import * as Joi from 'joi';

import { ConfigModule } from '@nestjs/config';
import { environments } from './environments';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DatabseModule } from './database/databse.module';
import { AuthModule } from './auth/auth.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        // DB Postgres
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
      }),
    }),
    ProductsModule,
    UsersModule,
    HttpModule,
    DatabseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async () => {
        const response = await axios({
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/todos',
        });
        return response.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
```

```ts
// auth.controller.ts
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.generateJWT(user);
  }
}
```

```ts
// auth.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from './../../users/services/users.service';
import { User } from 'src/users/entities/user.entity';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      return user;
    }
    return null;
  }

  // En el token enviaremos el role y el id.
  // Es buena práctica utilizar el naming sub para el id
  // Ante el login, retornaremos el user y el token
  // Es buena práctica tipar el payload
  generateJWT(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
```

La respuesta al login de users será la información del usuario y el access_token. Este deberá ser enviado en cada request para validar al usuario, y que ya no deba autenticarse nuevamente.

![Login.](/astro-doc-full-stack/images/nest-js/login3.webp)

> Recuerda modificar los .env para todos los ambientes.

> Estrategía para refresh token: https://wanago.io/2020/09/21/api-nestjs-refresh-tokens-jwt/

</details>

## Implementando JWT Guard

<details>
<summary>Detalle</summary>

Crearemos una strategy para validar los token que nos envían en los request (que no se haya modificado, que sea válido, que no este expirado, etc).

De esta manera, podremos implementar un guardian para utilizarlo en los endpoints que requieran autenticación.

Si el token es válido, en el mismo request tendremos el id del usuario y el role. Ya sabremos quien realiza la petición.

Primeramente creamos el archivo jwt.strategy.ts.

```ts
// src/auth/strategies/jwt.strategy.ts
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ) {
    super({
      // OBTENDREMOS EL TOKEN LOS HEADERS COMO 'Bearer token'
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // IGNORA LA EXPIRACION, EN TU CASO EL TIEMPO QUE LE HAYAS PUESTO
      // EJE.  signOptions: { expiresIn: '24h' }, YO LE PUSE 1 DIA
      ignoreExpiration: false,
      // LA LLAVE SECRETA CON LA QUE FIRMAMOS EL TOKEN AL HACER LOGIN
      secretOrKey: configService.jwtSecret,
    });
  }

  // ESTA FUNCION LO QUE HARA SERA RECIBIR EL TOKEN DECODIFICADO
  // CON LA CARGA DE DATOS QUE LE PUSIMOS AL HACER LOGIN
  async validate(payload: PayloadToken) {
    return payload;
  }
}
```

La funcion validate es importante ya que si el token es valido por nuestro servidor, el return de devolverá el payload al request de la ruta que vayamos a proteger.

El siguiente paso es importar la estrategia en nuestro modulo de autenticación, en los providers

```ts
// auth.module.ts
import { ConfigType } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from 'src/users/users.module';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import config from 'src/config';
import { JwtStrategy } from './strategies/jwt.strategy';

// Como ejemplo generamos los tokens con 10 días de vencimiento
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: { expiresIn: '10d' },
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
```

Temporalmente vamos a proteger los endpoints del controlador products. Luego creamos un guard.

```ts
// products.controller.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductsService } from '../services/products.service';
// import { ParseIntPipe } from './../common/parse-int/parse-int.pipe';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '../dtos/products.dtos';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAll(@Query() params: FilterProductDto) {
    return this.productsService.findAll(params);
  }

  @Get(':productId')
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto
  ) {
    return this.productsService.update(id, payload);
  }

  @Put(':id/category/:categoryId')
  addCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number
  ) {
    return this.productsService.addCategoryToProd(id, categoryId);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number
  ) {
    return this.productsService.removeCategoryByProd(id, categoryId);
  }
}
```

En este momento, solo se pordrá acceder a los endpoints de products si en los headers del request se configura el Bearer token.

</details>

## Extendiendo JWT Guard

<details>
<summary>Detalle</summary>
Ya tenemos la funcionalidad del proteger los distintos Endpoints de nuestra aplicación en base a una estrategia de autenticación con JWT5, ahora, vamos a extender estas funcionalidades, por ejemplo, esta bien que proteja la parte de crear, actualizar y borrar un producto en base a un usuario administrador, pero deberíamos poder ver los productos independientemente de que tengamos una sesión o no.

Vamos a ver como realizar esta extensión:

Para esto, vamos a crear un nuevo guardián.

```bash
nest g gu auth/guards/jwt-auth --flat
```

Ahora vamos a empezar a crear la lógica de como queremos que actúe este guardian:

```ts
// jwt-auth.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const IsPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    if (IsPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
```

Bien, ahora lo que vamos a hacer es decirle al product.controller que aplique el guardian que acabamos de crear:

```ts
// product.controller.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductsService } from '../services/products.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
// import { ParseIntPipe } from './../common/parse-int/parse-int.pipe';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '../dtos/products.dtos';
import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @Get()
  getAll(@Query() params: FilterProductDto) {
    return this.productsService.findAll(params);
  }

  @Public()
  @Get(':productId')
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto
  ) {
    return this.productsService.update(id, payload);
  }

  @Put(':id/category/:categoryId')
  addCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number
  ) {
    return this.productsService.addCategoryToProd(id, categoryId);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number
  ) {
    return this.productsService.removeCategoryByProd(id, categoryId);
  }
}
```

Y listo, de esta forma estamos utilizando nuestro guardián personalizo que nos permite programar excepciones, así que ya logramos extender el controlador que ya teníamos y logramos tener una lógica reutilizable.

</details>

## Control de roles en NestJS

<details>
<summary>Detalles</summary>

Ya logramos proteger nuestros Enpoint con una autenticación de usuario, pero un usuario común de nuestra aplicación no puede tener los mismos permisos que tiene un usuario administrador, es por eso que tenemos que crear un control de roles en nuestra aplicación.

Esta muy bien que los usuarios deban estar loguados para realizar modificaciones sobre prodcuto, categorías, pero no todos los usuarios. Solo los adminsitradores de podrán realizar estas tareas.

Los usuarios que no se encuentran loguados deben poder ver los productos, incluso, si lo deseamos comenzar a utilizar el carrito de compras, pero llegado el momento de realizar la compra debe estar autorizado como user. Será antes de colocar productos en el carrito o después pero deberá registrarse como customer.

Tanto el customer como el admin poseen tokens. Por el momento, si un usuario posee un token, puede crear marcas, productos, etc. Debemos blindar los endpoints de acuerdo al role que indique el tolken.

Para esto primero tenemos que definir cuales son los roles en nuestra aplicación, para esto vamos a ir a la carpeta de models y crearemos el siguiente modelo:

```ts
// src/auth/models/roles.model.ts:
export enum Role {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}
```

Una vez creada esta estructura, vamos a crear un decorador propio que nos permita validar estos roles:

```ts
// src/auth/decorators/roles.decorator.ts:
// importamos el inyectador de metadata
import { SetMetadata } from '@nestjs/common';

// nos traemos al modelo de role
import { Role } from '../models/roles.model';

// creamos una llave indicadora
export const ROLES_KEY = 'roles';

// creamos un decorador en el que recibiremos un arreglo de roles
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
```

Bien, ahora podremos definir en los Endpoints que roles queremos que puedan acceder a los Endpoints, veamos como hacer esto en los controladores:

```ts
// src/products/controllers/product.controller.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductsService } from '../services/products.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
// import { ParseIntPipe } from './../common/parse-int/parse-int.pipe';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '../dtos/products.dtos';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.models';

@UseGuards(JwtAuthGuard)
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @Get()
  getAll(@Query() params: FilterProductDto) {
    return this.productsService.findAll(params);
  }

  @Public()
  @Get(':productId')
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto
  ) {
    return this.productsService.update(id, payload);
  }

  @Put(':id/category/:categoryId')
  addCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number
  ) {
    return this.productsService.addCategoryToProd(id, categoryId);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number
  ) {
    return this.productsService.removeCategoryByProd(id, categoryId);
  }
}
```

Esto solo en parte, porque aún no hemos programado la lógica para que esto funcione, solo hemos desarrollado un decorador par poner la metadata al Endpoint, así que vamos a programar la lógica para que esto funcione:

Para esto vamos a crear un nuevo guardian en el que si el usuario Autenticado tiene el rol, le damos acceso, y si no tiene el rol, no le damos acceso:

Para esto vamos a nuestra terminal y ejecutamos el siguiente comando:

```bash
nest g gu auth/guards/roles --flat
```

```ts
// roles.guard.ts
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
// importamos al reflector, que nos brinda esta metadata
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
// nos traemos a la key de los roles
import { ROLES_KEY } from '../decorators/roles.decorator';
// nos traemos los modelos de los roles
import { Role } from '../models/roles.models';
// nos traemos al modelo de autenticación de usuario
import { PayloadToken } from '../models/token.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    // obtenemos los roles de la metadata, nos los dsrán como un arrar de roles
    const roles: Role[] = this.reflector.get(ROLES_KEY, context.getHandler());
    // preguntamos si en la metadata recibimos algún rol, si no hay roles
    if (!roles) {
      // lo dejamos pasar sin más
      return true;
    }
    // obtenemos el Request paraver el role que posee el user
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    const isAuth = roles.some((role) => role === user.role);
    // si el usuario no tiene autorización
    if (!isAuth) {
      // retornamos un error de no autorizado
      throw new ForbiddenException('Unauthorized');
    }
    // tiene permisos continúa
    return isAuth;
  }
}
```

Finalmente, en nuestro controlador, utilizamos el guardian **JwtAuthGuard**. Aquí podemos indicar que utilizaremos más de un guardían y se colocan en order. Primero el guardían de JwtAuthGuard (verifica que token, que sea válido) y luego pasa a verificar los roles.

```ts
// products.controller.ts

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductsService } from '../services/products.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
// import { ParseIntPipe } from './../common/parse-int/parse-int.pipe';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '../dtos/products.dtos';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.models';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @Get()
  getAll(@Query() params: FilterProductDto) {
    return this.productsService.findAll(params);
  }

  @Public()
  @Get(':productId')
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto
  ) {
    return this.productsService.update(id, payload);
  }

  @Put(':id/category/:categoryId')
  addCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number
  ) {
    return this.productsService.addCategoryToProd(id, categoryId);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number
  ) {
    return this.productsService.removeCategoryByProd(id, categoryId);
  }
}
```

Y listo, de esta forma ya estamos manejando roles en nuestra aplicación con Nest.js y tenemos una lógica de negocio firme. Desde Insomia solo podremos crear proudutos si el token que enviamos en el header corresponde a un user admin. Si es de un user customer nos retornará (403 - Forbidden).

Ahora nos toca trasladar la protección a todos los endpoints de todas las rutas que requieran o estar loguados o ser admninistrador.

</details>

## Obteniendo órdenes del perfil

<details>
<summary>Detalle</summary>

Vimos como podemos hacer para identificar un rol y de acuerdo al rol dar acceso a un endpoint, ahora tenemos el siguiente escenario:

**¿Como creamos un endpoint que retorne todas las órdenes relacionados con el usuario que tiene sesión?**

Una solución válida a este problema es que puedes crear un endpoint que enviándole el ID de un usuario te retorne dichas órdenes, algo como esto:

http://localhost:3000/users/1/orders

Este endpoint retornaría todas las órdenes del usuario con ID 1, sin embargo puede ser peligroso, es decir, **este endpoint solo debería estar disponible para los roles administradores**, pero no para los usuarios customers porque si un user conoce el ID de otro cliente podría obtener la información de órdenes de compra de otro usuario.

La solución más práctica para este caso es crear un endpoint de este tipo:

http://localhost:3000/profile/my-orders

En el endpoint anterior no estamos colocando de forma explícita el ID de un usuario. ¿Entonces como sabe a qué usuario le pertenecen las órdenes? Sencillo, sí nuestro usuario ya tiene una sesión, esta información está en el JWT (que se le otorgó al autentificarse en el sistema) podemos inferirlo de acuerdo a la sesión.

Lo primero es que vamos a hacer es crear un nuevo controlador ProfileController.

```bash
nest g co users/controllers/profile --flat
```

Allí vamos a exponer un nuevo endpoint que va a recibir la solicitud y gracias al decorador @UseGuards(JwtAuthGuard, RolesGuard) nos aseguramos que tenga un token válido, en ese método recogemos la información de usuario que tiene esa sesión así:

```ts
// profile.controller.ts
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.models';
import { PayloadToken } from 'src/auth/models/token.model';
import { OrdersService } from '../services/orders.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private ordersService: OrdersService) {}

  @Roles(Role.CUSTOMER)
  @Get('my-orders')
  getOrders(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.ordersService.ordersByCustomer(user.sub);
  }
}
```

Recordemos que la estrategia jwt dejó el user en el Request. Podemos obtener la información del Request y, obtener el ID y ya con eso podemos crear un método en nuestro servicio de órdenes:

```ts
// orders.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Customer } from '../entities/customer.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  findAll() {
    return this.orderRepo.find({ relations: ['customer'] });
  }

  // En la relacion hacia items, profundizamos para otener la info del prod
  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    });

    if (!order) throw new NotFoundException('order not found');
    return order;
  }

  async create(data: CreateOrderDto) {
    const newOrder = new Order();

    if (data.customerId) {
      const customer = await this.customerRepo.findOneBy({
        id: data.customerId,
      });
      newOrder.customer = customer;
    }

    return this.orderRepo.save(newOrder);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.findOne(id);

    if (changes.customerId) {
      const customer = await this.customerRepo.findOneBy({
        id: changes.customerId,
      });
      order.customer = customer;
    }

    this.orderRepo.save(order);
  }

  remove(id: number) {
    return this.orderRepo.delete(id);
  }

  async ordersByCustomer(userId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['customer'],
    });

    console.log('user', user);

    return this.orderRepo.find({
      where: { customer: { id: user.customer.id } },
      relations: ['items', 'items.product'],
    });
  }
}
```

</details>

<style>
  h1 { color: #713f12; }
  h2 { color: #2563eb; }
  h3 { color: #a855f7; }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  pre {
    padding: 10px;
  }
</style>
