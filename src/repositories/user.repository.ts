import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {User, UserRelations, Rol, Order} from '../models';
import {RolRepository} from './rol.repository';
import {OrderRepository} from './order.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.idUser,
  UserRelations
> {

  public readonly rol: BelongsToAccessor<Rol, typeof User.prototype.idUser>;

  public readonly orders: HasManyRepositoryFactory<Order, typeof User.prototype.idUser>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(User, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
    this.rol = this.createBelongsToAccessorFor('rol', rolRepositoryGetter,);
    this.registerInclusionResolver('rol', this.rol.inclusionResolver);
  }
}
