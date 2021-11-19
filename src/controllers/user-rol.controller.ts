import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  User,
  Rol,
} from '../models';
import {UserRepository} from '../repositories';

export class UserRolController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @get('/users/{id}/rol', {
    responses: {
      '200': {
        description: 'Rol belonging to User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rol)},
          },
        },
      },
    },
  })
  async getRol(
    @param.path.string('id') id: typeof User.prototype.idUser,
  ): Promise<Rol> {
    return this.userRepository.rol(id);
  }
}
