import { OrderController } from './order.controller';

export function createOrderController(): OrderController {
  return new OrderController();
}
