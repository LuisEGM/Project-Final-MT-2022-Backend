import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {DishCategory, DishCategoryRelations, Plate} from '../models';
import {PlateRepository} from './plate.repository';

export class DishCategoryRepository extends DefaultCrudRepository<
  DishCategory,
  typeof DishCategory.prototype.idDishCategory,
  DishCategoryRelations
> {

  public readonly plates: HasManyRepositoryFactory<Plate, typeof DishCategory.prototype.idDishCategory>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PlateRepository') protected plateRepositoryGetter: Getter<PlateRepository>,
  ) {
    super(DishCategory, dataSource);
    this.plates = this.createHasManyRepositoryFactoryFor('plates', plateRepositoryGetter,);
    this.registerInclusionResolver('plates', this.plates.inclusionResolver);
  }
}
