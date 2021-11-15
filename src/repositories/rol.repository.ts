import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Rol, RolRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.idRol,
  RolRelations
> {

  public readonly users: HasManyRepositoryFactory<User, typeof Rol.prototype.idRol>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Rol, dataSource);
    this.users = this.createHasManyRepositoryFactoryFor('users', userRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
