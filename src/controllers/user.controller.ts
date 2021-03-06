import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Llaves} from '../config/llaves';
import {Credenciales, User} from '../models';
import {UserRepository} from '../repositories';
import {AutenticacionService} from '../services';
const fetch = require('node-fetch');

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository : UserRepository,
    @service(AutenticacionService)
    public autenticacion_service : AutenticacionService
  ) {}


    @post('/users/autenticacion', {
      responses: {
        "200": {
          description: "Identificación de ususarios"
        }
      }
    })
    async identificarUser(
      @requestBody() credenciales :Credenciales
    ) {
      const user = await this.autenticacion_service.identificarUser(credenciales.email, credenciales.password)
      if (user) {
        const token = await this.autenticacion_service.generarTokenJWT(user);
        return {
          datos: {
            nombre: user.firstName + " " + user.lastName,
            correo: user.email,
            id: user.idUser,
            rol: token[1]
          },
          token: token[0]
        }
      }
      else {
        throw new HttpErrors[401]("Datos inválidos")
      }
    }

  @post('/users')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['idUser'],
          }),
        },
      },
    })
    user: Omit<User, 'idUser'>,
  ): Promise<User> {
    const password = this.autenticacion_service.generatePasswordFunction();
    const passwordEncrypted = this.autenticacion_service.encryptPasswordFunction(password);
    user.password= passwordEncrypted;
    const instance_user = await this.userRepository.create(user);

    //Cuerpo del sms
    const receiver = user.email;

    fetch(`${Llaves.urlServicoNotificaciones}/api/v1/notification/email/confirm-register`, {
      method: 'POST',
      body: JSON.stringify({
        "receiver": receiver,
        "name": `${instance_user.firstName} ${instance_user.lastName}`,
        "password": password
      }),
	    headers: {'Content-Type': 'application/json'}
    })
    return instance_user;
  }


  @post('/users/recuperarPassword')
  @response(200, {
    description: 'Recuperar contraseña'
    // content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async recuperarPassword(
    @requestBody() credenciales :Credenciales
  ){

    const user = await this.userRepository.findOne({where: {email: credenciales.email }});

    if (user) {
      const password = this.autenticacion_service.generatePasswordFunction();
      const passwordEncrypted = this.autenticacion_service.encryptPasswordFunction(password);
      user.password = passwordEncrypted;

      await this.userRepository.update(user);

      const { firstName, lastName } = user;

      fetch(`${Llaves.urlServicoNotificaciones}/api/v1/notification/email/change-password`, {
        method: 'POST',
        body: JSON.stringify({
          "receiver": credenciales.email,
          "name": `${firstName} ${lastName}`,
          "password": password
        }),
        headers: {'Content-Type': 'application/json'}
      })
      return user;
    }
    else {
      throw new HttpErrors[401](`No existe un usuario con email: ${credenciales.email}`)
    }
  }




  @get('/users/count')
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @patch('/users')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/users/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
