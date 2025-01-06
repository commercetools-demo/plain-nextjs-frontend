import { commercetoolsClient } from "../commercetools/client";
import { Order, OrderImportDraft } from "@commercetools/platform-sdk";
export class OrderService {
  async importOrder(orderImport: OrderImportDraft, SubscriptionID: string, PlanID: string): Promise<Order> {
    
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
              value: {
                centAmount: orderImport.totalPrice.centAmount,
                currencyCode: "USD"
              }
            }
          }
        ],
        custom: {
          type: {
            typeId: "type",
            key: "subscription-order"
          },
          fields: {
            "SubscriptionID": SubscriptionID,
            "PlanID": PlanID,
            StartDate: new Date().toISOString(),
            EndDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
            RenewalDate: new Date(new Date().setMonth(new Date().getMonth() + 11)).toISOString(),

          }
        }
      } as OrderImportDraft })
      .execute();

    return response.body;
  }
}
