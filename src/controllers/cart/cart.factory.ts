import { CartController } from './cart.controller';

export function createCartController(): CartController {
  return new CartController();
}
