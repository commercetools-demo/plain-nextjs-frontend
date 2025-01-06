import { commercetoolsClient } from "../commercetools/client";
import { Order, OrderImportDraft } from "@commercetools/platform-sdk";
export class OrderService {
  async importOrder(orderImport: OrderImportDraft): Promise<Order> {
    
    const response = await commercetoolsClient
      .orders()
      .importOrder()
      .post({ body: {
        ...orderImport,
        lineItems: [
          {
            name: {
              "en-US": "Creators' App"
            },
            variant: {
              sku: "sonu_subscription_creator_app_sku",
            },
            quantity: 1,
            price: {
              value: orderImport.totalPrice
            }
          }
        ]
      } as OrderImportDraft })
      .execute();

    return response.body;
  }
}
