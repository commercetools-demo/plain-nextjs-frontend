import { CartController } from "@/controllers/cart/cart.controller";
import { createCartController } from "@/controllers/cart/cart.factory";

export abstract class BaseRouteHandler {
    protected controller: CartController;
  
    constructor() {
      this.controller = createCartController();
    }
  
    protected createResponse(response: any): Response {
      return new Response(response.body, {
        status: response.statusCode,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }