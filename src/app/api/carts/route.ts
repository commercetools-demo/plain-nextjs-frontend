import { createCartController } from "@/controllers/cart/cart.factory";
import { CartQuery } from "@/core/types/cart/cart-query";
import { handleError } from "@/lib/error-handler";

export async function GET(request: Request) {
  try {
    const cartController = createCartController();
    const { searchParams } = new URL(request.url);
    const cartQuery: CartQuery = {
      cartId: searchParams.get("cartId") || undefined,
      accountId: searchParams.get("accountId") || undefined,
      status: searchParams.get("status") || undefined,
    };

    const response = await cartController.getCarts(cartQuery);
    return new Response(response.body, {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const { statusCode, body } = handleError(error);
    return new Response(body, {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}
