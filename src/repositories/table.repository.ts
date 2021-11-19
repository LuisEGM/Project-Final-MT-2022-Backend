import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Table, TableRelations, Order} from '../models';
import {OrderRepository} from './order.repository';

export class TableRepository extends DefaultCrudRepository<
  Table,
  typeof Table.prototype.idTable,
  TableRelations
> {

  public readonly orders: HasManyRepositoryFactory<Order, typeof Table.prototype.idTable>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(Table, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
