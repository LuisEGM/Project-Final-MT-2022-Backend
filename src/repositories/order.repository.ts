import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Order, OrderRelations, User, Table, OrderDetails} from '../models';
import {UserRepository} from './user.repository';
import {TableRepository} from './table.repository';
import {OrderDetailsRepository} from './order-details.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.idOrder,
  OrderRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Order.prototype.idOrder>;

  public readonly table: BelongsToAccessor<Table, typeof Order.prototype.idOrder>;

  public readonly orderDetails: HasManyRepositoryFactory<OrderDetails, typeof Order.prototype.idOrder>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('TableRepository') protected tableRepositoryGetter: Getter<TableRepository>, @repository.getter('OrderDetailsRepository') protected orderDetailsRepositoryGetter: Getter<OrderDetailsRepository>,
  ) {
    super(Order, dataSource);
    this.orderDetails = this.createHasManyRepositoryFactoryFor('orderDetails', orderDetailsRepositoryGetter,);
    this.registerInclusionResolver('orderDetails', this.orderDetails.inclusionResolver);
    this.table = this.createBelongsToAccessorFor('table', tableRepositoryGetter,);
    this.registerInclusionResolver('table', this.table.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
