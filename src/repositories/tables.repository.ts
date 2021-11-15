import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Tables, TablesRelations, Order} from '../models';
import {OrderRepository} from './order.repository';

export class TablesRepository extends DefaultCrudRepository<
  Tables,
  typeof Tables.prototype.idTable,
  TablesRelations
> {

  public readonly order: HasOneRepositoryFactory<Order, typeof Tables.prototype.idTable>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(Tables, dataSource);
    this.order = this.createHasOneRepositoryFactoryFor('order', orderRepositoryGetter);
    this.registerInclusionResolver('order', this.order.inclusionResolver);
  }
}
