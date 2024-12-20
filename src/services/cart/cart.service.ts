import { CartQuery } from "@/core/types/cart/cart-query";
import { commercetoolsClient } from "../commercetools/client";
import { CartPagedQueryResponse } from "@commercetools/platform-sdk";
export class CartService {
  async getCarts(cartQuery: CartQuery): Promise<CartPagedQueryResponse> {
    const where = [];
    if (cartQuery.cartId) {
      where.push(`id = "${cartQuery.cartId}"`);
    }

    if (cartQuery.accountId) {
      where.push(`accountId = "${cartQuery.accountId}"`);
    }

    if (cartQuery.status) {
      where.push(`status = "${cartQuery.status}"`);
    }
    const response = await commercetoolsClient
      .carts()
      .get({
        queryArgs: {
          ...(where.length > 0 && { where: where.join(" and ") }),
        },
      })
      .execute();

    return response.body;
  }
}
