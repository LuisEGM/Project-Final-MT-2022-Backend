import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {OrderDetails, OrderDetailsRelations, Order, Plate} from '../models';
import {OrderRepository} from './order.repository';
import {PlateRepository} from './plate.repository';

export class OrderDetailsRepository extends DefaultCrudRepository<
  OrderDetails,
  typeof OrderDetails.prototype.idOrderDetails,
  OrderDetailsRelations
> {

  public readonly order: BelongsToAccessor<Order, typeof OrderDetails.prototype.idOrderDetails>;

  public readonly plate: BelongsToAccessor<Plate, typeof OrderDetails.prototype.idOrderDetails>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>, @repository.getter('PlateRepository') protected plateRepositoryGetter: Getter<PlateRepository>,
  ) {
    super(OrderDetails, dataSource);
    this.plate = this.createBelongsToAccessorFor('plate', plateRepositoryGetter,);
    this.registerInclusionResolver('plate', this.plate.inclusionResolver);
    this.order = this.createBelongsToAccessorFor('order', orderRepositoryGetter,);
    this.registerInclusionResolver('order', this.order.inclusionResolver);
  }
}
