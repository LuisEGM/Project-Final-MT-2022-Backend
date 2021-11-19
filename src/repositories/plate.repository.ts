import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Plate, PlateRelations, DishCategory, OrderDetails} from '../models';
import {DishCategoryRepository} from './dish-category.repository';
import {OrderDetailsRepository} from './order-details.repository';

export class PlateRepository extends DefaultCrudRepository<
  Plate,
  typeof Plate.prototype.idPlate,
  PlateRelations
> {

  public readonly dishCategory: BelongsToAccessor<DishCategory, typeof Plate.prototype.idPlate>;

  public readonly orderDetails: HasManyRepositoryFactory<OrderDetails, typeof Plate.prototype.idPlate>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DishCategoryRepository') protected dishCategoryRepositoryGetter: Getter<DishCategoryRepository>, @repository.getter('OrderDetailsRepository') protected orderDetailsRepositoryGetter: Getter<OrderDetailsRepository>,
  ) {
    super(Plate, dataSource);
    this.orderDetails = this.createHasManyRepositoryFactoryFor('orderDetails', orderDetailsRepositoryGetter,);
    this.registerInclusionResolver('orderDetails', this.orderDetails.inclusionResolver);
    this.dishCategory = this.createBelongsToAccessorFor('dishCategory', dishCategoryRepositoryGetter,);
    this.registerInclusionResolver('dishCategory', this.dishCategory.inclusionResolver);
  }
}
