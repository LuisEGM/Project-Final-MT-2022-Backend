import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Tables, TablesRelations, Order} from '../models';
import {OrderRepository} from './order.repository';

export class TablesRepository extends DefaultCrudRepository<
  Tables,
  typeof Tables.prototype.idTable,
  TablesRelations
> {

  public readonly orders: HasManyRepositoryFactory<Order, typeof Tables.prototype.idTable>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(Tables, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
