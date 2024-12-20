import { CartQuery } from "@/core/types/cart/cart-query";
import { CartService } from "@/services/cart/cart.service";
export class CartController {
  cartService: CartService;
  constructor() {
    this.cartService = new CartService();
  }

  async getCarts(cartQuery: CartQuery): Promise<Response> {
    const cart = await this.cartService.getCarts(cartQuery);
    return new Response(JSON.stringify(cart), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
