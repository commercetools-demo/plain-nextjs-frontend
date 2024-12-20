export abstract class BaseRouteHandler {
    protected controller: CartController;
  
    constructor() {
      this.controller = createCartController();
    }
  
    protected createResponse(response: CartResponse): Response {
      return new Response(response.body, {
        status: response.statusCode,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }