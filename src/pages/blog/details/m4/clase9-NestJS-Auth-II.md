---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 4 - Clase 9 - NestJS Auth II
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/henry/m4/clase1/back.webp',
    alt: 'NestJS',
  }
icon: { src: '/astro-doc-full-stack/images/icon-general.png', alt: 'Logo' }
description: NestJS Auth II
draft: false
category: Backend Js Nest
---

## Control de acceso basado en roles

## Establecimiento y gestión de roles para el control de acceso

Previamente, hemos visto cómo construir un sistema de autenticación que brinde acceso a los usuarios para hacer uso de los recursos de nuestras aplicaciones. De esto, surge la necesidad de determinar hasta qué punto y qué clase de recursos puede consumir un usuario.

Piensa en una aplicación correspondiente a una tienda virtual. Las funcionalidades disponibles para un usuario comprador, estarían limitadas a buscar los productos, agregarlos a un carrito y pagar por ellos.

Un usuario con permisos administrativos, por su parte, tendría la posibilidad de hacer lo mismo que el comprador, además de crear, editar o eliminar productos u ofertas, gestionar órdenes de compra, consultar datos estadísticos de ventas, etcétera. Pero, **¿cómo podemos definir estos tipos de usuarios y restringir los accesos?**

El proceso de **Autorización Basado en Roles o RBAC** (Role Based Access Control) concede generar una distinción de permisos según el rol de un usuario dentro de una aplicación. Este modelo está basado en tres conceptos principales.

- <mark>Roles</mark>: Son vistos como conjuntos de permisos que definen las actividades permitidas para ciertos usuarios. Por ejemplo, un sistema puede tener roles como "Administrador", "Usuario" e "Invitado", cada uno con diferentes niveles de acceso.

- <mark>Usuarios</mark>: Son individuos o entidades que interactúan con el sistema y a quienes se les asignan roles específicos. Cada usuario puede tener uno o más roles que determinan sus capacidades dentro del sistema.

- <mark>Permisos</mark>: Acciones específicas que un usuario puede realizar en un sistema, como leer, escribir, actualizar o eliminar datos. Estos permisos están asociados con roles y determinan qué acciones están permitidas para cada usuario según su rol.

Dentro de una aplicación NestJS, la incorporación de **RBAC** normalmente incluye la definición de roles específicos, la asignación de permisos a dichos roles y la posterior verificación de los roles de los usuarios durante la autenticación, con el fin de autorizar su acceso a recursos o funciones específicas.

Esto se puede lograr utilizando middlewares, decoradores personalizados o funciones de autorización dentro de los controladores de rutas.

> Para definir los roles en una aplicación existen diversas herramientas y enfoques. Tenemos la asignación de roles y permisos definidos dentro de la lógica de la aplicación o el uso de librerías de autorización y control de acceso, como lo son Auth 0 o Passport.

En la demo crearemos un archivo llamado role.enum.ts para definir los distintos roles que tendrán los usuarios.

```ts
// src/role.enum.ts

export enum Role {
  User = 'user',
  Admin = 'admin',
}
```

Teniendo los roles podemos crear un guardian que verifique el role para acceder a los distintos endpoints. Para ello utilizareremos un **decorador propio**.

```ts
// src/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/roles.emun';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
```

Agregamos el decorador a un endpoint de users.

```ts
import { Role } from 'src/roles.emun';
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

  @Get('admin')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getAmin() {
    return "Ruta protegida";
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

Ahora podemos definir el guradian para los roles.

```ts
// src/guards/roles.guard.ts
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExcecutionContent
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      content.getHandler(),
      content.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const hasRole = () => {
      requiredRoles.some((role) => user?.roles?.includes(role));
    };

    const valid = user && user.roles && hasRole();

    if (!valid)
      throw new ForbiddenException(
        'You do not have permission and are not allowed to access this route'
      );

    return valid;
  }
}
```

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

import { Role } from 'src/role.enum';

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
      payload.roles = [Role.Admin];
      request.user = payload;
      return true;
    } catch (err) {
      if (!token) throw new UnauthorizedException('Invalid Token');
    }

    return validateRequest(request);
  }
}
```

De esta manera, podemos verificar que solo el user loguado (token) como admin, pero al role Adin lo tenemos hardcodeado en auth.guard.ts. Por el momento, todos los usuarios son Admin.

Para solucionarlo podemos crear una tabla de roles y una relacion de muchos a muchos (N:N) entre roles y usuarios. Pero como nuestra aplicación solo posee dos roles (user o admin), podemos crear una columna en users llamada isAdmin.

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

  @Column({ default: false })
  isAdmin: boolean;

  @Colunm()
  createdAt: string;
}
```

```ts
// createUser.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLenght,
  IsEmpty,
} from 'class-validator';

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

  @IsEmpty()
  isAdmin: boolean;
}
```

```bash
npm run migration:generate src/migrations/add_user_isAdmin
npm run build
npm run migration:run
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
      roles: [dbUser.isAdmin ? Role.Admin : Role.User],
    };

    // Generamos un token
    const token = this.jwtService.sign({});

    return { success: 'User Logged in successfully', token };
  }
}
```

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

import { Role } from 'src/role.enum';

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
      // payload.roles = [Role.Admin];
      request.user = payload;
      return true;
    } catch (err) {
      if (!token) throw new UnauthorizedException('Invalid Token');
    }

    return validateRequest(request);
  }
}
```

Hemos visto una implementación básica de la Autorización Basado en Roles, una práctica sencilla, pero muy eficiente y ampliamente utilizada en aplicaciones donde se manejan pocos roles.

> En caso de aplicaciones más grandes y con mayor complejidad, lo ideal sería implementar este procedimiento por medio de librerías especializadas como puede ser Auth0.

## ¿Qué es Auth0?

Una alternativa para simplificar el proceso de autenticación es **Auth0**. Esta librería externa se encarga de la gestión del acceso, autenticación, autorización y administración de usuarios para aplicaciones web, móviles y APIs. Auth0 es comúnmente utilizada, debido a que nos ofrece:

<mark>Auth0</mark>

- **Atentificación segura**: Brinda métodos de autenticación seguros como inicio de sesión social, inicio de sesión mediante nombre de usuario y contraseña, autenticación multifactor (MFA), autenticación basada en JWT, y más.

- **Autorización y control de acceso**: Permite definir roles y permisos para usuarios, así como políticas de autorización para controlar el acceso a recursos protegidos en la apliación.

- **Integraciones y extensibilidad**: Puede integrarse con una amplia gamade proveedores de identidad, plataformas de aplicaciones y servicios en la nube, lo que facilita su uso en una variedad de entornos de desarrollo.

- **Administración de usuarios**: Proporciona herramientas para la gestión de usuarios, incluida la creación, edición, eliminación y búsqueda, así como el manejo de perfiles de usuario y datos de perfil.

Aunque la curva de aprendizaje es un poco más compleja que la aproximación que realizamos anteriormente, la utilidad y eficiencia de Auth0 son mayores.

> Veamos cómo agregar Auth0 a nuestra aplicación

- El primer paso será el proceso de registro e ingreso de usuarios, iniciando sesión mediante redes sociales, o a través del correo y contraseña.

## Integración de autenticación utilizando cuentas de redes sociales

Para integrar una aplicación, lo primero que debemos hacer es crear una cuenta de **Auth0**(opens in a new tab). Dentro de la página principal, damos clic en Sign up y seleccionamos la forma de registrarnos, sea con email y contraseña, o iniciando sesión con Google, Github o Microsoft. Lo dejamos a tu gusto.

![Auth0](/astro-doc-full-stack/images/henry/m4/clase9/authII.webp)

Una vez finalizado el proceso de registro, tendremos acceso al panel de control de la librería:

Por ser la primera vez:

Haremos clic en el botón **Create Application** que nos dirige a un modal donde podemos seleccionar el nombre y tipo de aplicación que deseamos crear.

En nuestro caso, seleccionaremos la opción **Regular Web Applications**. Finalmente, damos click en **Create**.

![Auth0](/astro-doc-full-stack/images/henry/m4/clase9/authII-2.webp)

Por ser la primera vez:

- Haremos clic en el botón **Create Application** que nos dirige a un modal donde podemos seleccionar el nombre y tipo de aplicación que deseamos crear.

- En nuestro caso, seleccionaremos la opción **Regular Web Applications**. Finalmente, damos click en **Create**.

![Auth0](/astro-doc-full-stack/images/henry/m4/clase9/authII-3.webp)

Seleccionamos ahora **Node.js(Express)**, ya que trabajaremos con Nest que se encuentra construido sobre Express JS.

![Auth0](/astro-doc-full-stack/images/henry/m4/clase9/authII-4.webp)

Por último, seleccionaremos la opción **Integrate Now** para comenzar la configuración e integración de la aplicación.

![Auth0](/astro-doc-full-stack/images/henry/m4/clase9/authII-5.webp)

Esto nos llevará a un panel de integración que nos guiará paso a paso para implementar **Auth0**. El primer paso es definir las URL con las que trabaja mi aplicación, las cuales dejaremos con los valores por default y guardaremos los cambios.

![Auth0](/astro-doc-full-stack/images/henry/m4/clase9/authII-6.webp)

De esta manera llegaremos a la pestaña de integración donde nos indican instalar la dependencia de **express-openid- connect** y a **express**. En nuestro caso, solo la primer dependencia es necesaria pues Express ya se encuentra configurado dentro del proyecto, así que solo ejecutaremos el comando:

```bash
npm install express-openid-connect
```

Esta dependencia nos permite realizar la configuración de un middleware para Express, que facilita la integración de **Open ID Connect**. Este último es un protocolo de autenticación y autorización que proporciona autenticación basada en tokens de JWT.

![Auth0](/astro-doc-full-stack/images/henry/m4/clase9/authII-7.webp)

Para utilizar este **middleware**, debemos realizar la configuración con las credenciales definidas en el snippet que nos proporciona la pestaña de integración.

```ts
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: '5CXjsd43ldbnDS09ssd342SnmSR',
  issuerBaseUrl: 'https://dev-23lkdf83klfk.us.auth0.com',
};
```

Esta es información sensible que debe ser almacenada en variables de entorno.

Recuerda usar tus propias credenciales:

```bash
# .development.env

AUTH0_SECRET='a long, randomly-generated string stored in env'
AUTH0_AUDIENCE='5CXjsd43ldbnDS09ssd342SnmSR'
AUTH0_CLIENT_ID='5CXjsd43ldbnDS09ssd342SnmSR'
AUTH0_BASE_URL='https://dev-23lkdf83klfk.us.auth0.com'
```

El ejemplo que nos proporciona **Auth0** está construido sobre Express, así que realizaremos algunos cambios para integrarlo a Nest.

**ver video**

<mark>¡No nos confundamos! Este valor no es un Token de JWT.</mark>

- Es un dato interno del proceso de Auth0 que permite validar la sesión del usuario en el navegador.

- Esto no quiere decir que no podamos generarlos en caso de ser requeridos, aunque realmente el proceso de autenticación de Auth0 puede trabajar de forma independiente.

## Cierre

En esta sesión aprendimos cómo el **control de acceso basado en roles** nos permite gestionar los permisos de los usuarios dentro de la aplicación de acuerdo con su rol o nivel de autorización.

Esto garantiza que los usuarios solo tengan acceso a los recursos de la aplicación que les corresponden, lo que ayuda a proteger datos sensibles y conservar la seguridad de la aplicación en general.

Exploramos también sobre la autenticación con librerías externas, en este caso, **Auth0**. Esta nos permite simplificar el proceso de verificación de la identidad de los usuarios, ofreciendo una solución segura y escalable para la gestión de identidades.

Auth0 proporciona funciones avanzadas de autenticación, como la **autenticación** social, la integración con proveedores de identidad empresariales y la gestión centralizada de usuarios, lo que hace significativamente más sencilla la implementación y gestión de la autenticación en nuestras aplicaciones.

## Homework

### ACTIVIDAD 01

Definir un guardián para la validación del rol de administrador en usuarios para el control de acceso.

### ACTIVIDAD 02

Modificar Entidad y Dtos para implementar el campo de administrador:

- Todos los registros serán considerados usuarios por default.

- El campo admin no debe ser recibido dentro de la solicitud.

- El campo admin no debe ser mostrado en las rutas que devuelven un usuario (únicamente en la ruta GET /users/).

### ACTIVIDAD 03

Definir los roles de la aplicación (únicamente es necesario el rol de administrador).

### ACTIVIDAD 04

Asignar y verificar de rol junto con el proceso de firma de JWT.

### ACTIVIDAD 05

Implementar de control de Acceso en las rutas:

- GET /users/

- PUT /products/:id

**TIPs: ¡Bien hecho!**

- No olvides utilizar un custom decorator para la definición de roles.

**[Requisitos]**:

Al terminar este hito la aplicación deberá contar con rutas protegidas por medio del Control de acceso basado en roles.

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
  img[alt="Auth0"] {
  max-width:  600px;
  margin: 0 auto;
  display: block;
  }
</style>
