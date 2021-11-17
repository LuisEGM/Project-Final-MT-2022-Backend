import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Plate, PlateRelations} from '../models';

export class PlateRepository extends DefaultCrudRepository<
  Plate,
  typeof Plate.prototype.idPlate,
  PlateRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Plate, dataSource);
  }
}
