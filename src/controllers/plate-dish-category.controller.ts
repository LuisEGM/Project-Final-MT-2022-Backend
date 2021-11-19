import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Plate,
  DishCategory,
} from '../models';
import {PlateRepository} from '../repositories';

export class PlateDishCategoryController {
  constructor(
    @repository(PlateRepository)
    public plateRepository: PlateRepository,
  ) { }

  @get('/plates/{id}/dish-category', {
    responses: {
      '200': {
        description: 'DishCategory belonging to Plate',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DishCategory)},
          },
        },
      },
    },
  })
  async getDishCategory(
    @param.path.string('id') id: typeof Plate.prototype.idPlate,
  ): Promise<DishCategory> {
    return this.plateRepository.dishCategory(id);
  }
}
