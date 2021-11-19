import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  OrderDetails,
  Plate,
} from '../models';
import {OrderDetailsRepository} from '../repositories';

export class OrderDetailsPlateController {
  constructor(
    @repository(OrderDetailsRepository)
    public orderDetailsRepository: OrderDetailsRepository,
  ) { }

  @get('/order-details/{id}/plate', {
    responses: {
      '200': {
        description: 'Plate belonging to OrderDetails',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plate)},
          },
        },
      },
    },
  })
  async getPlate(
    @param.path.string('id') id: typeof OrderDetails.prototype.idOrderDetails,
  ): Promise<Plate> {
    return this.orderDetailsRepository.plate(id);
  }
}
