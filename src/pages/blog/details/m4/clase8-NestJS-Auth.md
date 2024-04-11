---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 4 - Clase 8 - NestJS Auth
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/henry/m4/clase1/back.webp',
    alt: 'NestJS',
  }
icon: { src: '/astro-doc-full-stack/images/icon-general.png', alt: 'Logo' }
description: NestJS Auth
draft: false
category: Backend Js Nest
---

## Estrategias de autenticación

## ¿Qué es el proceso de autenticación en NestJS?

La autenticación es un componente esencial que se enfoca en **confirmar la identidad de los usuarios y regular su acceso a los recursos protegidos**.

Su función principal es **salvaguardar los datos sensibles y activos de la aplicación**, garantizando que solo los usuarios verificados puedan acceder a ellos. La autenticación no solo asegura la **integridad del sistema**.

> Es crucial para cumplir con requisitos de seguridad y privacidad de los usuarios, especialmente en aplicaciones que **gestionan información confidencial o personal**.

- El objetivo de la autenticación dentro de una aplicación de Nest, será verificar las credenciales de un usuario que son recibidas dentro de una solicitud.

- Dichas credenciales consisten de una **identificación**, como el correo, nombre de usuario o número telefónico, y una **contraseña**, la cual debe ser registrada de forma segura dentro de la base de datos de la aplicación.

Al iniciar sesión, las credenciales son validadas por el servidor para comprobar que, efectivamente, tanto el usuario como su contraseña corresponden a los registros de la aplicación.

De ser así, se otorga el acceso, pudiendo este incluir opcionalmente una clave (o **token**), habilitando al usuario para utilizar las funcionalidades protegidas del sitio web.

Para bajarlo más a tierra, pensemos en el sistema de autenticación como el ingreso a un edificio de oficinas.

En la recepción, brindas tus datos personales para verificar tu identidad. Una vez confirmada, tendrás acceso mediante una puerta o torniquete, permitiéndote usar áreas designadas, como tu espacio de trabajo.

El funcionamiento de un sistema de autenticación en nuestra explicación será similar a este ejemplo.

> "El usuario ingresa con sus datos, se validan sus credenciales y accede a los distintos recursos que le proporciona la aplicación."

## Elección y aplicación de estrategias según el contexto de la aplicación

La manera de implementar una autenticación, depende totalmente de las necesidades del proyecto así como las especificaciones del equipo de desarrollo. Para elegir la estrategia adecuada de autenticación para una aplicación, es crucial tener en cuenta una variedad de factores y aspectos que pueden influir significativamente en la decisión.

Estas consideraciones pueden ir desde la **escalabilidad del proyecto**, con el manejo de tokens como una opción sólida y eficiente, hasta **regulaciones de seguridad** definidas por algunos estándares actuales internacionales.

Existen diversas estrategias de autenticación que se pueden implementar en proyectos de NestJS. Algunas de las más comunes son...

Estrategias de autenticación

- <mark>Autenticación basada en tokens JWT (Json Web Token)</mark>: Este método implica la generación de tokens: cadenas cifradas para autenticar el acceso de un usuario en una aplicación. En este enfoque, tras una exitosa autenticación, se emite un token JWT al cliente, actuando como un identificador único y temporal. Este será incluído en cada solicitud subsiguiente para validar el acceso a recursos específicos de manera segura y eficiente.

- <mark>Autenticación multifactor (MFA)</mark>: Esta estrategia agrega una capa adicional de seguridad al requerir que los usuarios proporcionen múltiples formas de autenticación, como una contraseña y características biométricas o un código de verificación enviado a su dispositivo móvil.

- <mark>Autenticación basada en sesiones</mark>: Esta práctica incluye el uso de sesiones para mantener el estado de autenticación del usuario en el servidor. Esta sesión se utiliza para validar continuamente las solicitudes del usuario durante un período específico, proporcionando acceso a recursos y funcionalidades sin la necesidad de volver a ingresar credenciales en cada interacción.

- <mark>Autenticación con proveedores de identidad externos</mark>: Esta técnica permite a los usuarios autenticarse en una aplicación, utilizando credenciales de inicio de sesión de plataformas externas, como Google, Facebook o GitHub. Esto simplificará el proceso de registro y mejorará la experiencia del usuario.

> En esta sesión abordaremos una de las estrategias más comunes en proyectos de Nest, debido a su eficiencia y escalabilidad.

> - la facilidad de su implementación y mantenimiento, las cuales suelen ser una de las consideraciones más importantes para escoger estas estrategias de autenticación.

Es evidente la importancia de implementar un sistema de autenticación para regular el acceso a los recursos protegidos de nuestros proyectos.

Pero, en cuanto a nuestras credenciales como usuarios:¿estas también están protegidas?
¿De qué manera evitamos que estos datos sean vulnerados?

Veamos cómo resolver esta cuestión

## Encriptación de contraseñas

## Manejo de credenciales de autenticación

El manejo de credenciales se refiere a la gestión de la información del usuario asociada con los datos de autenticación, como correo electrónico y contraseña, utilizados para verificar la identidad de un usuario registrado.

Este proceso comprende **dos** fases:

- La **registración de credenciales**, que ocurre cuando un usuario ingresa por primera vez sus datos en la aplicación.

- La **recuperación de las mismas**, que tiene lugar cada vez que el usuario ingresa a la página.

Podemos trabajar directamente agregando un nuevo servicio para gestionar el **proceso de registro (sign up)** y de **ingreso (sign in)**.

La idea es que este nuevo servicio actúe en conjunto con el servicio de usuarios **(UsersDbService)** por lo que debemos inyectar la dependencia dentro de su constructor.

Dicho servicio debe trabajar dentro de **UsersModule** para controlar el proceso de autenticación y así crear y dar acceso a usuarios a la aplicación.

Haciendo uso de lo que ya hemos venido construyendo en las sesiones anteriores, definamos un nuevo archivo **auth.service.ts** para esto.

> Recuerda que debe ser incorporado a la lista de proveedores del módulo users.

Comenzamos con la creación de usuarios. Crearemos un servicio (auth) con dos métodos. Sign up (registro) y Sign in (login).

```ts
// src/users/auth.service.ts
import {Injectable} from '@nestjs/common';

import {UsersDBService} from './usersDB.service';
import {User} from './users.entity';


@Injectable()
export class AuthService {
  constructor(private readonly usersDBService: UsersDBService) {

    async signUp(user: User) {
      const dbUser = await this.usersDBService.getUserByEmail(user.mail)
      if (dbUser) throw new BadRequestException("Email already exists");
      return;
    }

    async signIn() {

    }
  }

}
```

```ts
// usersDB.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './users.entity';

@Injectable()
export class UsersDBService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  getUserById(id: string) {
    this.usersRepository.findOne({ where: { id } });
  }

  getUserByEmail(email: string) {
    this.usersRepository.findOne({ where: { email } });
  }

  saveUser(user: Omit<User, 'id'>) {
    this.userRepository.save(user);
  }
}
```

## Encriptación de contraseñas

El siguiente paso será **encriptar la contraseña**: este es el proceso de transformar la información de una contraseña original en una forma codificada o cifrada, con el fin de protegerla contra accesos no autorizados y salvaguardar la privacidad del usuario.

<mark>La encriptación asegura que las contraseñas de los usuarios sean almacenadas en un formato que únicamente sea legible si se tiene acceso a una clave que revierta dicho formato (**desencriptación**).</mark>

Existen múltiples herramientas que nos permiten realizar la encriptación de datos e incluso podemos generar nuestras propias funciones de encriptación.

En esta ocasión, haremos uso de la **librería Bcrypt**.

- **Bcrypt** es una biblioteca de hashing (transformación) diseñada para almacenar contraseñas de forma segura.

- Su función principal es convertir las contraseñas en una cadena de caracteres irreconocible y difícil de revertir, conocida como hash.

Veamos un ejemplo de cómo luce una contraseña hasheada desde la página oficial: https://bcrypt.online/

### ¿Cómo se genera ese valor hash?

Bcrypt toma la contraseña de entrada y la convierte haciendo uso de un algoritmo matemático, junto con un valor denominado **SALT**. Dicho valor agrega caracteres aleatorios adicionales al proceso de hashing para aumentar la seguridad.

> Para incorporar esta librería a nuestro proyecto, basta que sea instalada con el comando.

```bash
npm install bcrypt
```

Vamos a modificar el CreateUserDto para que también nos envíen el password.

```ts
// createUser.dto.ts
import { IsNotEmpty, IsString, IsEmail, MinLenght } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLenght()
  password: string;
}
```

```ts
// src/users/users.entity.ts
import { Entity, Colunm, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Colunm()
  name: string;

  @Colunm()
  email: string;

  @Colunm()
  password: string;

  @Colunm()
  createdAt: string;
}
```

Almacenaremos la contraseña en la BD encriptada a través de bcrypt. Como es un algoritmo destructivo no es posible a través del hash obtener la contraseña original.

En el proceso de Login, para verificar el password, simplemente realizamos el proceso de hash sobre la contraseña que nos envían y comparamos el hash de la BD con el hash del pasword recibido. No comparamos contraseñas, comparamos la encriptción de la contraseña.

```ts
// src/users/auth.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersDBService } from './usersDB.service';
import { User } from './users.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersDBService: UsersDBService) {}

  async signUp(user: User) {
    const dbUser = await this.usersDBService.getUserByEmail(user.mail);
    if (dbUser) throw new BadRequestException('Email already exists');

    const hashedPass = await bcrypt.hash(user.password, 10);
    if (!hashedPass)
      throw new BadRequestException('Password could not be hashed');

    this.usersDBService.saveUser({ ...user, password: hashedPass });
    return { success: 'User created succesfully' };
  }

  async signIn() {}
}
```

```ts
// usersDB.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './users.entity';

@Injectable()
export class UsersDBService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  getUserById(id: string) {
    this.usersRepository.findOne({ where: { id } });
  }

  getUserByEmail(email: string) {
    this.usersRepository.findOne({ where: { email } });
  }

  saveUser(user: Omit<User, 'id'>) {
    this.userRepository.save(user);
  }
}
```

```ts
// users.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  Res,
  Req,
  Param,
  Body,
  Headers,
  UseGuard,
  UseInterceptors,
  parseUUIDPipe,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { UsersService } from './users.service';
import { User } from './user.interface';
import { User as UserEntity } from './user.entity';
import { AuthGuard } from './../guards/auth.guard';
import { DateAdderInterceptor } from './../interceptors/date-adder.interceptor';
import { usersDBService } from './usersDB.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { CloudinaryService } from './cloudinary.service';
import { AuthService } from './AuthService.service';

@Controller('users')
// @UseGuard(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersDBService: UsersDBService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly authService: AuthService
  ) {}

  // ...

  @Get(':id')
  getUserById(@Param('id', parseUUIDPipe) id: string) {
    return this.usersDBService.getUserById(id);
  }

  // Agregamos Pipes
  @Post('profile/images')
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(MinSizeValidatorPipe)
  createUserImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 100000,
            message: `El archivo debe ser menor a 100kb`,
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      })
    )
    file: Express.Multer.File
  ) {
    return this.cloudinaryService.uploadImage(file);
  }

  @Post('signup')
  @UseInterceptor(DateAdderInterceptor)
  createUser(
    @Body() user: Omit<User, 'id'>,
    @req() request: Request & { now: string }
  ) {
    return this.authService.signUp({ ...user, createdAt: request.now });
  }

  // ...
}
```

```ts
// users.module.ts
import { Module } from '@nestjs/common';
import { CloudinaryConfig } from 'src/config/cloudinary';

import { UsersController } from './users.controllers';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CloudinaryService } from './cloudinary.service';
import { Authservice } from './auth.service';

// import { UsersRepository } from './users.repository';

// const mockUsersService = {
//   getUsers: () => 'Este es un servicio mock de usuario',
// };

@Module({
  imports: [typeOrmModule.forFeature([User])],
  controllers: [UsersController],
  // providers: [UsersService, UsersRepository],
  // cuando encuentre UserService, utiliza mockUsersService
  providers: [
    // {
    //   provide: UsersService,
    //   useValue: mockUsersService,
    // },
    UsersDBService,  // lo creamos en el paso siguiente
    UsersService,
    UsersRepository,
    CloudinaryConfig,
    CloudinaryService,
    Authservice,
    {
      provide: 'API_USERS'
      useFactory: async() => {
        const apiUsers = await fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json());
        return apiUsers.map(user => {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          }
        })
      }
    }
  ],
})
export class UsersModule {}
```

Para ejecutar una migración que crea un nuevo campo (password) de tipo NOT NULL en la tabla users debemos asegurarnos de que la tabla no posee datos. Si nos toca esta situación en producción deberíamos generar la columna como nullable, updatear las filas con algun valor, y luego pasarla a NOT NULL o generarla como NOT NULL pero con un valor por default.

```sql
DELETE FROM users;
```

```bash
npm run migration:generate src/migrations/addPassword
npm run buid
npm run migration:run
```

Ya podemos realizar el signup en nuestra App.

```json
// POST http://localhost:3000/users/signup

{
  "name": "Mauricio",
  "email": "jourdanmauricio@gmail.com",
  "password": "12345678"
}
```

## Desencriptación y validación de credenciales

Ahora, realizaremos el proceso de validación de credenciales al realizar el **signin**. En esta ocasión, lo que recibiremos en el controlador serán el correo y la contraseña del usuario, los cuales son obtenidos mediante un formulario de login.

> Ambos son enviados como un objeto dentro del cuerpo de una solicitud a un **endpoint signin** a través del método signin de **AuthService**.

- La función **signin** se encargará de verificar la existencia del usuario ejecutando el método findByEmail de UsersDbService, utilizando como argumento el correo recibido.

- Si no es encontrado, devolverá una excepción.

- Caso contrario, realizará la validación de la contraseña utilizando la función compare de Bcrypt.

- Dicha función recibe como primer argumento la contraseña recibida dentro del cuerpo de la solicitud, y como segundo argumento la contraseña hasheada almacenada en la base de datos correspondiente al usuario encontrado por correo.

> La finalidad de **compare** será comparar ambas contraseñas para **validar** si son identificas, y devolverá un valor **booleano** que podremos usar para manejar la lógica de este resultado.

Con el usuario creado ya podrámos loguarnos...

```ts
// src/users/auth.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersDBService } from './usersDB.service';
import { User } from './users.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersDBService: UsersDBService) {}

  async signUp(user: User) {
    const dbUser = await this.usersDBService.getUserByEmail(user.mail);
    if (dbUser) throw new BadRequestException('Email already exists');

    const hashedPass = await bcrypt.hash(user.password, 10);
    if (!hashedPass)
      throw new BadRequestException('Password could not be hashed');

    this.usersDBService.saveUser({ ...user, password: hashedPass });
    return { success: 'User created successfully' };
  }

  async signIn(email: string, password: string) {
    const dbUser = await this.usersDBService.getUserByEmail(user.mail);

    if (!dbUser) throw new BadRequestException('User not found');

    const match = await bcrypt.compare(password, dbUser.password);

    if (!match) throw new BadRequestException('Invalid password');

    return { success: 'User Logged in successfully ' };
  }
}
```

```bash
npm i @nestjs/swagger
```

```ts
// userCredentials.dto.ts
import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from './CreateUser.dto';

export class UserCredentialsDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
```

```ts
// users.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  Res,
  Req,
  Param,
  Body,
  Headers,
  UseGuard,
  UseInterceptors,
  parseUUIDPipe,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { UsersService } from './users.service';
import { User } from './user.interface';
import { User as UserEntity } from './user.entity';
import { AuthGuard } from './../guards/auth.guard';
import { DateAdderInterceptor } from './../interceptors/date-adder.interceptor';
import { usersDBService } from './usersDB.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { CloudinaryService } from './cloudinary.service';
import { AuthService } from './AuthService.service';

@Controller('users')
// @UseGuard(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersDBService: UsersDBService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly authService: AuthService
  ) {}

  // ...

  @Get(':id')
  getUserById(@Param('id', parseUUIDPipe) id: string) {
    return this.usersDBService.getUserById(id);
  }

  // Agregamos Pipes
  @Post('profile/images')
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(MinSizeValidatorPipe)
  createUserImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 100000,
            message: `El archivo debe ser menor a 100kb`,
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      })
    )
    file: Express.Multer.File
  ) {
    return this.cloudinaryService.uploadImage(file);
  }

  @Post('signup')
  @UseInterceptor(DateAdderInterceptor)
  createUser(
    @Body() user: Omit<User, 'id'>,
    @req() request: Request & { now: string }
  ) {
    return this.authService.signUp({ ...user, createdAt: request.now });
  }

  @Post('signin')
  signin(@Body() user: UserCredentialsDto) {
    return this.authService.signin(user.email, user.password);
  }

  // ...
}
```

```json
// POST http://localhost:3000/users/signin

{
  "email": "jourdanmauricio@gmail.com",
  "password": "12345678"
}
```

Hemos logrado crear el registro e ingreso de usuarios por medio de la gestión de credenciales, utilizando un servicio de autenticación dentro de nuestra aplicación y la encriptación de contraseñas con Bcrypt.

Una vez realizada la validación de credenciales, **¿cómo podemos dar acceso al usuario?**

Para responder a esto ha llegado el momento de conocer a **JSON Web Token**.

## JSON Web Token

## Definicion y estructura de JSON Web Token (JWT)

**JWT (JSON Web Token)** es un estándar público que define un formato compacto y autónomo para la transmisión segura de información entre partes como un **objeto JSON**. Se utiliza comúnmente para la autenticación y autorización en aplicaciones web y servicios API.

- La forma en la que trabaja **JWT** es por medio de la **emisión de tokens (claves o pases)** con una estructura específica y certificada que es provista al cliente y debe ser enviada de vuelta junto con cada solicitud subsecuente para validar la identidad de un usuario autenticado.

Únicamente las solicitudes con un token válido pueden tener acceso a información protegida dentro del servidor.

La **estructura de un token** se compone de 3 partes principales separadas por puntos “ . ” :

- <mark>Header</mark> -> Contiene el tipo de token y el algoritmo de firma utilizado para firmar el token. Este algoritmo no es más que un método matemático utilizado para generar una firma digital, que verifique la integridad y autenticidad del token.

**Comúnmente pueden ser de tipo HMAC, RSA o ECDSA.**

En este caso, será de tipo HS256, una combinación entre HMAC y SHA-256. En otras palabras, el token será una cadena de caracteres de longitud fija igual a 256 bits de tipo JWT.

- <mark>Payload</mark> -> Contiene la información que se quiere transmitir, como los datos del usuario autenticado o cualquier otro tipo de datos relevante. Para la codificación, se hace uso del formato **Base64Url** propio de **JWT**.

- <mark>Signature (Firma)</mark> -> Corresponde a una versión codificada del header, el payload y una **CLAVE SECRETA** definida dentro de la aplicación y el algoritmo empleado para generar la firma. Se utiliza para verificar la integridad del token y garantizar que no haya sido alterado durante la transmisión.

> El resultado lucirá parecido a esto: 23kjhg4k.j23h4k25.345njhj5

## Implementación de JWT para gestionar sesiones y accesos

Vamos a integrar la autenticación por medio de JWT dentro de nuestra app. Para incorporar la librería de JWT en Nest, es necesario instalarla utilizando el comando:

```bash
npm install --save @nestjs/jwt
```

Una vez instalada, la configuración puede ser realizada de forma independiente para cada módulo. Sin embargo, la incorporaremos de manera global a nuestra aplicación por facilidad.

Trabajaremos dentro del módulo principal de la aplicación. Allí importamos a **JwtModule** de **@nestjs/jwt**, que nos permite utilizar la función register. Esta función recibe un objeto con las opciones de configuración para la firma de tokens mediante JWT.

Dentro de dicho objeto, asociaremos la **CLAVE SECRETA** de la aplicación que será utilizada para generar tokens específicos.

Esta es información sensible, así que lo ideal será almacenar su valor dentro de una variable de entorno. Además agregaremos una opción adicional a la firma que nos permitirá asignar un tiempo de expiración al token.

Si quieres conocer más opciones disponibles para configurar la firma, puedes acceder al repositorio de JWT. https://github.com/auth0/node-jsonwebtoken

Vamos a configurar JWT en nuestro servidor.

```bash
# .env.delopment
DB_NAME=pm4_db
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=example

CLOUDINARY_CLOUD_NAME=XXXXXXXXXXXXXXX
CLOUDINARY_API_SECRET=XXXXXXXXXXX
CLOUDINARY_API_KEY=XXXXXXXXXXXX

JWT_SECRET=superclavesecreta
```

```ts
// app.module.ts
import { Module }  from '@nestjs/common' ;
import { TypeOrmModule} from '@nestjs/typeorm' ;
// import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import typeOrmConfig from './config/typeorm';
import { JwtModule } from '@nestjs/jwt';
// import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,   // para acceder desde cualquier lado de la app
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => configService.get('typeorm'),
    }),
    UserModule,
    TodosModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    })
  ],
  contreollers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: MyInterceptor,
    // },
  ]
})

export class app.module {}

```

```ts
// src/users/auth.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JWTService } from '@nest/jwt';

import { UsersDBService } from './usersDB.service';
import { User } from './users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersDBService: UsersDBService,
    private readonly jwtService: JwtService
  ) {}

  async signUp(user: User) {
    const dbUser = await this.usersDBService.getUserByEmail(user.mail);
    if (dbUser) throw new BadRequestException('Email already exists');

    const hashedPass = await bcrypt.hash(user.password, 10);
    if (!hashedPass)
      throw new BadRequestException('Password could not be hashed');

    this.usersDBService.saveUser({ ...user, password: hashedPass });
    return { success: 'User created successfully' };
  }

  async signIn(email: string, password: string) {
    const dbUser = await this.usersDBService.getUserByEmail(user.mail);

    if (!dbUser) throw new BadRequestException('User not found');

    const match = await bcrypt.compare(password, dbUser.password);

    if (!match) throw new BadRequestException('Invalid password');

    const userPayload = {
      sub: dbUser.id,
      id: dbUser.id,
      email: dbUser.email,
    };

    // Generamos un token
    const token = this.jwtService.sign({});

    return { success: 'User Logged in successfully', token };
  }
}
```

Los datos que se encuentran en un token se pueden ver en [jwt.io](https://jwt.io/). Allí podremos pegar el token y nos mostrará su contenido.

Hasta el momento, creamos el token y lo enviamos al cliente cuando realiza el Login. Ahora debemos verificar el token. Para ello utilizaremos el header de las peticiones. Ocuparemos el atributo Authorization con el valor "Bearer < token >". Es decir, el valor siempre comienza con la palabra Bearer más un espacio más el token.

```ts
// src/guards/auth.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constuctor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers['authorization']?.split(' ')[1] ?? '';

    if (!token) throw new UnauthorizedException('Bearer token not found');

    try {
      const secret = process.env.JWT_SECRET;
      // verificamos la firma
      const payload = this.jwtService.verify(token, { secret });

      // Formateamos fechas
      payload.iat = new Date(payload.iat * 1000);
      payload.exp = new Date(payload.exp * 1000);
      // Hardcodeamos Role
      payload.roles = ['admin'];
      request.user = payload;
      return true;
    } catch (err) {
      if (!token) throw new UnauthorizedException('Invalid Token');
    }

    return validateRequest(request);
  }
}
```

Probamos el guardían en el endpoint profile.

```ts
// users.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  Res,
  Req,
  Param,
  Body,
  Headers,
  UseGuard,
  UseInterceptors,
  parseUUIDPipe,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { UsersService } from './users.service';
import { User } from './user.interface';
import { User as UserEntity } from './user.entity';
import { AuthGuard } from './../guards/auth.guard';
import { DateAdderInterceptor } from './../interceptors/date-adder.interceptor';
import { usersDBService } from './usersDB.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { CloudinaryService } from './cloudinary.service';
import { AuthService } from './AuthService.service';

@Controller('users')
// @UseGuard(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersDBService: UsersDBService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly authService: AuthService
  ) {}

  // ...
  @Get('profile')
  UseGuards(AuthGuard)
  getUserProfile(/*@Headers('token') token: string*/
  @Req() resquest: Resquest & { user: any }) {

    console.log("user: ", request.user)
    return "Perfil del usuario";
  }

  @Get(':id')
  getUserById(@Param('id', parseUUIDPipe) id: string) {
    return this.usersDBService.getUserById(id);
  }

  // Agregamos Pipes
  @Post('profile/images')
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(MinSizeValidatorPipe)
  createUserImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 100000,
            message: `El archivo debe ser menor a 100kb`,
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      })
    )
    file: Express.Multer.File
  ) {
    return this.cloudinaryService.uploadImage(file);
  }

  @Post('signup')
  @UseInterceptor(DateAdderInterceptor)
  createUser(
    @Body() user: Omit<User, 'id'>,
    @req() request: Request & { now: string }
  ) {
    return this.authService.signUp({ ...user, createdAt: request.now });
  }

  @Post('signin')
  signin(@Body() user: UserCredentialsDto) {
    return this.authService.signin(user.email, user.password);
  }

  // ...
}
```

## Cierre

En esta clase, hemos abordado de manera exhaustiva varios aspectos clave relacionados con la autenticación en NestJS.

Conocimos de qué trata el proceso de autenticación, un concepto que nos es muy familiar, pero que no sabíamos a fondo su completo funcionamiento. Descubrimos, además, las diferentes estrategias de autenticación que nos permiten definir un sistema flexible y eficiente, según nuestros gustos o necesidades en las aplicaciones.

Comprendimos también cómo encriptar y desencriptar contraseñas de manera segura, a partir de la librería bcrypt y de qué forma implementarla en nuestros proyectos. Con esto, hemos adquirido un conocimiento sólido que nos permitirá diseñar y desarrollar sistemas de autenticación robustos y seguros para nuestros clientes.

Finalmente, hemos explorado el uso de JWT (JSON Web Token) como una herramienta poderosa basada en tokens, brindándonos una mayor comprensión de cómo desarrollar y gestionar la autenticación de forma eficaz en nuestras aplicaciones NestJS.

## Homework

### ACTIVIDAD 01

**Sign Up**

- Sustituir el endpoint POST /users por el endpoint POST /auth/signup que será creado dentro del controlador de autenticación.

- Este endpoint recibirá la misma estructura que recibia el endpoint anterior y adicionalmente recibirá una propiedad de confirmación de contraseña, debes validar que ambas contraseñas sean recibidas y coincidan o devolver una excepción.

- Debe registrar al usuario dentro de la base de datos con una contraseña hasheada

- Debe retornar al usuario sin contraseña

### ACTIVIDAD 02

**Sign In**

- Modificar la funcionalidad de signIn para que valide el password encriptado con el provisto en la solicitud.

- Enviar un error genérico en caso de existir algún error ya sea por que el usuario no es encontrado o por que el password es incorrecto

- Crear un token de acceso para el usuario registrado con una validez de 1 hora

### ACTIVIDAD 03

**Auth Guard**

- Modificar la funcionalidad del guardián de autenticación para la validación de tokens.

- Enviar un error en caso de no recibir el token o en caso de que este o sea un token válido con código de error 401

- El token debe ser verificado por medio de una clave secreta que no debe ser mostrada directamente en el código (Variables de entorno).

- Una vez validado el token debes adjuntar la información correspondiente al tiempo de expiración de dicho token

### ACTIVIDAD 04

Los endpoints protegidos por este guardián serán los siguientes

- POST /uploadImage/:productId
- POST /orders
- GET /orders/:id
- PUT /products/:id
- GET /users
- GET /users/:id
- PUT /users/:id
- DELETE /users/:id

**TIPs - ¡Bien hecho!:**

- Recuerda modificar el DTO para la creación de usuarios.
- Puedes utilizar decoradores personalizados para la validación.

**[Requisitos]**

Al finalizar el alumno tendrá que haber implementado un sistema de autenticación por medio de la encriptación de contraseñas y la validación por medio de la gestión de tokens de JWT
El proyecto deberá contar con rutas protegidas particulares y rutas públicas accesibles sin la necesidad de un token.

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
